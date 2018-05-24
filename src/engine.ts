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
    this.draw();
  }

  private setCanvasSize() {
    this.canvas = document.getElementById('level');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.checkMove();
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(this.player.currentPosition.x, this.player.currentPosition.y, 10, 10);
    window.requestAnimationFrame(this.draw.bind(this));
  }

  private checkedCordinates: any = {};
  private checkMove() {
    if (this.player.moveInProgress === false) {
      return;
    }
    
    this.checkedCordinates = {};

    for (let i = 1; i <= 8; i++) {
      if (i == 1) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x - 10, y: this.player.currentPosition.y - 10 }
      } else if (i == 2) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x, y: this.player.currentPosition.y - 10 }
      } else if (i == 3) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x + 10, y: this.player.currentPosition.y - 10 }
      } else if (i == 4) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x + 10, y: this.player.currentPosition.y }
      } else if (i == 5) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x + 10, y: this.player.currentPosition.y + 10 }
      } else if (i == 6) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x, y: this.player.currentPosition.y + 10 }
      } else if (i == 7) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x - 10, y: this.player.currentPosition.y + 10 }
      } else if (i == 8) {
        this.checkedCordinates[i] = { x: this.player.currentPosition.x - 10, y: this.player.currentPosition.y }
      }
    }

    let closestMove = '1';
    for (const key in this.checkedCordinates) {
      const cordinate = this.checkedCordinates[key];
      this.checkedCordinates[key].xDiff = Math.abs(cordinate.x - this.player.requestedPosition.x); 
      this.checkedCordinates[key].yDiff = Math.abs(cordinate.y - this.player.requestedPosition.y); 
      if (this.checkedCordinates[key].xDiff < this.checkedCordinates[closestMove].xDiff && this.checkedCordinates[key].yDiff < this.checkedCordinates[closestMove].yDiff) {
        closestMove = key;
      }
    }

    this.player.currentPosition.x = this.checkedCordinates[closestMove].x;
    this.player.currentPosition.y = this.checkedCordinates[closestMove].y;
  
    if (this.player.currentPosition.x === this.player.requestedPosition.x && this.player.currentPosition.y === this.player.requestedPosition.y) {
      this.player.moveInProgress = false;
    }
  }
}

new Engine();