import { Player} from './player';

class Engine {
  public player: Player;
  public canvas: any;
  public ctx: any;

  constructor() {
    this.player = new Player();

    this.canvas = document.getElementById('level');
    this.ctx = this.canvas.getContext('2d');

    this.setCanvasSize()

    window.addEventListener('resize', this.setCanvasSize.bind(this), false);
    window.requestAnimationFrame(this.draw.bind(this));
  }

  private setCanvasSize() {
    this.canvas = document.getElementById('level');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(this.player.x, this.player.y, 10, 10);
    window.requestAnimationFrame(this.draw.bind(this));
  }
}

new Engine();