import { Player} from './player';

export class Engine {
  public canvas: any;
  public ctx: any;

  public players: Player[];

  constructor(opts: { players: Player[] }) {
    this.players = opts.players;

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');

    this.setCanvasSize()

    window.addEventListener('resize', this.setCanvasSize.bind(this), false);
    this.draw();
  }

  private setCanvasSize() {
    this.canvas = document.getElementById('level');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPlayers();
    this.drawDummyWall();
    window.requestAnimationFrame(this.draw.bind(this));
  }

  private drawDummyWall() {
    this.ctx.fillStyle = 'rgb(255, 0, 0)';
    this.ctx.fillRect(200, 200, 100, 10);
  }

  private drawPlayers() {
    this.players.forEach(player => {
      player.move();
      this.ctx.fillStyle = 'rgb(0, 0, 0)';
      this.ctx.fillRect(player.currentPosition.x, player.currentPosition.y, 10, 10);
    });
  }
}
