import { Assets } from './assets';
import { Player} from './player';
import { Game } from './game';

export class Engine {
  private imgs: any;
  private player: Player;
  private game: Game;

  private canvas: any;
  private ctx: any;

  constructor(game: Game) {
    this.imgs = game.assets.imgs;
    this.player = game.player;
    this.game = game;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 640;

    this.animate();
  }

  private animate() {
    this.drawLevel();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  private drawLevel() {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.clearRect(0, 0, 800, 640);

    this.game.level.map.forEach((row: any[], i: number) => {
      row.forEach((cellValue: number | string, ii: number) => {
        let x = ii*32;
        let y = i*32;

        // void space
        if (cellValue === '0') {
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(x, y, 32, 32);
          return;
        }

        // ground tile
        if (cellValue === 'F') {
          this.ctx.drawImage(this.imgs.ground.element, x, y);
        }

        if (this.inPlayerSight(x, y)) {
          // draw items with higher visibilitly because of the players location
          this.drawLevelExits(cellValue, x, y);
        } else {
          // draw items with lower visibilitly because of the players location
          this.drawLevelExits(cellValue, x, y);

          // the shadows
          this.ctx.fillStyle = 'rgba(0,0,0,0.9)';
          this.ctx.fillRect(x, y, 32, 32);
        }
      });
    });

    this.ctx.fillStyle = '#444';
    this.ctx.fillRect(this.player.currentPosition.x * 32, this.player.currentPosition.y * 32, 32, 32);
  }

  private inPlayerSight(x: number, y: number): boolean {
    let playerMinXLight = (this.player.currentPosition.x - 1) * 32;
    let playerMaxXLight = (this.player.currentPosition.x + 1) * 32;
    let playerMinYLight = (this.player.currentPosition.y - 1) * 32;
    let playerMaxYLight = (this.player.currentPosition.y + 1) * 32;

    return ((x >= playerMinXLight && x <= playerMaxXLight) && (y >= playerMinYLight && y <= playerMaxYLight))
  }

  private drawLevelExits(type: any, x: number, y: number) {
    // next level exit
    if (type === 'N') {
      this.ctx.fillStyle = '#ff8300';
      this.ctx.fillRect(x, y, 32, 32);
    }

    // previous level exit
    if (type === 'P') {
      this.ctx.fillStyle = '#ffee00';
      this.ctx.fillRect(x, y, 32, 32);
    }
  }
}
