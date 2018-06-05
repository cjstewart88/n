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

  private frameCount = 0;
  private fps = 10;
  private fpsInterval: any;
  private startTime: any;
  private now: any;
  private then: any;
  private elapsed: any;

  constructor(game: Game) {
    this.imgs = game.assets.imgs;
    this.level = game.level;
    this.zeroOneMatrixOfLevel = this.toZeroOneMatrix();
    this.player = game.player;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 640;

    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;

    this.animate();
  }

  private animate() {
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    // if enough time has ela
    window.requestAnimationFrame(this.animate.bind(this));

    if (this.elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.movePlayerIfRequested();
      this.drawLevel();
    }
  }

  private toZeroOneMatrix() {
    let nRow = this.level.length;
    let nCol = this.level[0].length;
    let matrix = new Array(nRow);

    for (let y = 0; y < nRow; y++) {
      matrix[y] = new Array(nCol);
      for (let x = 0; x < nCol; x++) {
        matrix[y][x] = this.level[y][x] === 'F' ?  0 : 1;
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

    this.level[this.player.currentPosition.y][this.player.currentPosition.x] = 'F';

    this.player.currentPosition.x = nextPlayerPosition[0];
    this.player.currentPosition.y = nextPlayerPosition[1];

    this.level[this.player.currentPosition.y][this.player.currentPosition.x] = 'P';

  }

  private drawLevel() {
    this.ctx.clearRect(0, 0, 800, 600);

    this.level.forEach((row: any[], i: number) => {
      row.forEach((cellValue: number | string, ii: number) => {
        let x = ii*32;
        let y = i*32;

        if (cellValue === '0') {
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(x, y, 32, 32);
          return;
        }

        this.ctx.drawImage(this.imgs.ground.element, x, y);


        if (cellValue === 'P') {
          this.ctx.fillStyle = '#444';
          this.ctx.fillRect(x, y, 32, 32);
        }
      });
    });
  }
}
