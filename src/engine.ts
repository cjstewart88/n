import { Assets } from './assets';
import { Player} from './player';
import { Game } from './game';
import * as PF from 'pathfinding';

export class Engine {
  private imgs: any;
  private player: Player;
  private level: any;
  private zeroOneMatrixOfLevel: any;

  private pathToRequestedPosition: any;

  private canvas: any;
  private ctx: any;

  constructor(game: Game) {
    this.imgs = game.assets.imgs;
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
        matrix[y][x] = this.level[y][x] === 'T' ?  1 : 0;
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
        let x = ii*20;
        let y = i*20;

        if (cellValue === '0') {
          this.ctx.drawImage(this.imgs.grass.element, x, y);
        } else if (cellValue === 'T') {
          this.ctx.drawImage(this.imgs.tree.element, x, y);
        } else if (cellValue === 'P') {
          this.ctx.fillStyle = 'rgb(0, 0, 0)';
          this.ctx.fillRect(x, y, 20, 20);
        }

      });
    });
  }
}
