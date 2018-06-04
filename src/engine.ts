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
    this.canvas.height = 600;

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
        matrix[y][x] = this.level[y][x] === 'A' ?  1 : 0;
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

    this.replaceMatrixValuesForPlayer(nextPlayerPosition);

    this.player.currentPosition.x = nextPlayerPosition[0];
    this.player.currentPosition.y = nextPlayerPosition[1];
  }

  private replaceMatrixValuesForPlayer(nextPlayerPosition: number[]) {
    let oldPlayerDirection = this.player.direction.charAt(1); // R, L, U, D
    let oldSpritePos = parseInt(this.player.direction.charAt(2)); // 1, 2, 3, 4

    if (nextPlayerPosition[1] === this.player.currentPosition.y) {
      if ((this.player.currentPosition.x - nextPlayerPosition[0]) < 0) {
        if (oldPlayerDirection !== 'R' || oldSpritePos === 4) {
          this.player.direction = 'PR1';
        } else {
          this.player.direction = `PR${oldSpritePos+1}`;
        }
      } else {
        if (oldPlayerDirection !== 'L' || oldSpritePos === 4) {
          this.player.direction = 'PL1';
        } else {
          this.player.direction = `PL${oldSpritePos+1}`;
        }  
      }
    } else if (nextPlayerPosition[0] === this.player.currentPosition.x) {
      if ((this.player.currentPosition.y - nextPlayerPosition[1]) < 0) {
        if (oldPlayerDirection !== 'D' || oldSpritePos === 4) {
          this.player.direction = 'PD1';
        } else {
          this.player.direction = `PD${oldSpritePos+1}`;
        }
      } else {
        if (oldPlayerDirection !== 'U' || oldSpritePos === 4) {
          this.player.direction = 'PU1';
        } else {
          this.player.direction = `PU${oldSpritePos+1}`;
        }
      }
    }

    this.level[nextPlayerPosition[1]][nextPlayerPosition[0]] = this.player.direction;
    this.level[this.player.currentPosition.y][this.player.currentPosition.x] = '0';
  }

  private drawLevel() {
    this.ctx.clearRect(0, 0, 800, 600);
    
    this.level.forEach((row: any[], i: number) => {
      row.forEach((cellValue: number | string, ii: number) => {
        let x = ii*20;
        let y = i*20;

        this.ctx.drawImage(this.imgs.ground.element, x, y);

        if (cellValue === 'A') {
          this.ctx.drawImage(this.imgs.space.element, 80, 0, 20, 20, x, y, 20, 20);
          return;
        } else if  (cellValue  === 'B') {
          this.ctx.drawImage(this.imgs.space.element, 20, 0, 20, 20, x, y, 20, 20);
        } else if  (cellValue  === 'C') {
          this.ctx.drawImage(this.imgs.space.element, 40, 0, 20, 20, x, y, 20, 20);
        } else if  (cellValue  === 'D') {
          this.ctx.drawImage(this.imgs.space.element, 60, 0, 20, 20, x, y, 20, 20);
        } 
        
        if (cellValue === 'PD1') {
          this.ctx.drawImage(this.imgs.player.element, 0, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PD2') {
          this.ctx.drawImage(this.imgs.player.element, 20, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PD3') {
          this.ctx.drawImage(this.imgs.player.element, 40, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PD4') {
          this.ctx.drawImage(this.imgs.player.element, 60, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PL1') {
          this.ctx.drawImage(this.imgs.player.element, 80, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PL2') {
          this.ctx.drawImage(this.imgs.player.element, 100, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PL3') {
          this.ctx.drawImage(this.imgs.player.element, 120, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PL4') {
          this.ctx.drawImage(this.imgs.player.element, 140, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PR1') {
          this.ctx.drawImage(this.imgs.player.element, 160, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PR2') {
          this.ctx.drawImage(this.imgs.player.element, 180, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PR3') {
          this.ctx.drawImage(this.imgs.player.element, 200, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PR4') {
          this.ctx.drawImage(this.imgs.player.element, 220, 0, 20, 20, x, y, 20, 20);
        }  else if (cellValue === 'PU1') {
          this.ctx.drawImage(this.imgs.player.element, 240, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PU2') {
          this.ctx.drawImage(this.imgs.player.element, 260, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PU3') {
          this.ctx.drawImage(this.imgs.player.element, 280, 0, 20, 20, x, y, 20, 20);
        } else if (cellValue === 'PU4') {
          this.ctx.drawImage(this.imgs.player.element, 300, 0, 20, 20, x, y, 20, 20);
        }
      });
    });
  }
}
