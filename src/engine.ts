import { Player} from './player';
import { Game } from './game';
import * as PF from 'pathfinding';


export class Engine {
  private player: Player;
  private level: any;
  private zeroOneMatrixOfLevel: any;

  private pathToRequestedPosition: any;

  private canvas: any;
  private ctx: any;

  constructor(game: Game) {
    this.level = game.level;
    this.zeroOneMatrixOfLevel = this.toZeroOneMatrix();
    this.player = game.player;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.animate();
  }

  private animate() {
    this.movePlayerIfRequested();
    this.drawLevel();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  private toZeroOneMatrix() {
    let nRow = this.level.length;
    let nCol = this.level[0].length;
    let matrix = new Array(nRow);

    for (let y = 0; y < nRow; y++) {
      matrix[y] = new Array(nCol);
      for (let x = 0; x < nCol; x++) {
        matrix[y][x] = this.level[y][x] === 'W' ?  1 : 0;
      }
    }

    return matrix;
  }

  private movePlayerIfRequested() {
    if (!this.player.requestedPosition) {
      return;
    }

    if (this.pathToRequestedPosition === undefined) {
      const pathFinder = new PF.DijkstraFinder();
      const grid = new PF.Grid(this.zeroOneMatrixOfLevel);
      this.pathToRequestedPosition = pathFinder.findPath(this.player.currentPosition.x, this.player.currentPosition.y, this.player.requestedPosition.x, this.player.requestedPosition.y, grid);
    } 

    if (this.pathToRequestedPosition.length === 0) {
      this.player.requestedPosition = undefined;
      this.pathToRequestedPosition = undefined;
      return;
    }

    const nextPlayerPosition = this.pathToRequestedPosition.shift(); 
    this.level[this.player.currentPosition.y][this.player.currentPosition.x] = '0';
    this.player.currentPosition.x = nextPlayerPosition[0];
    this.player.currentPosition.y = nextPlayerPosition[1];
    this.level[this.player.currentPosition.y][this.player.currentPosition.x] = 'P';
  }

  private drawLevel() {
    this.ctx.clearRect(0, 0, 800, 600);
    
    this.level.forEach((row: any[], i: number) => {
      row.forEach((cellValue: number | string, ii: number) => {
        if (cellValue === '0') {
          return;
        }

        if (cellValue === 'W') {
          this.ctx.fillStyle = 'rgb(255, 0, 0)';
        } else if (cellValue === 'P') {
          this.ctx.fillStyle = 'rgb(0, 0, 0)';
        }

        let x = ii*10;
        let y = i*10;
        this.ctx.fillRect(x, y, 10, 10);
      });
    });
  }
}
