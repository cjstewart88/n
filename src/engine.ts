import { Player} from './player';
import { Game } from './game';

export class Engine {
  private player: Player;
  private level: any;

  private canvas: any;
  private ctx: any;

  constructor(game: Game) {
    this.level = game.level;
    this.player = game.player;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.draw();
  }

  private draw() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.player.move();
    this.drawLevel();
    window.requestAnimationFrame(this.draw.bind(this));
  }

  private drawLevel() {
    this.level.forEach((row: any[], i: number) => {
      row.forEach((cellValue: string, ii: number) => {
        if (cellValue === 'E') {
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
