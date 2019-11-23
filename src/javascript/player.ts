import { Game } from './game';

export class Player {
  public currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  public requestedPosition: { x: number, y: number } | undefined;

  private game: Game;

  constructor(game: Game) {
    this.game = game;

    document.getElementById('level').addEventListener('click', this.tryToStart.bind(this));
    document.getElementById('level').onmousemove = this.handleMovement.bind(this);
  }

  private handleMovement(event: MouseEvent) {
    if (!this.game.inProgress) return;
    this.requestedPosition = { x: event.offsetX - 8, y: event.offsetY - 8 };
    this.checkRequestedMove();
  }

  private tryToStart(event: MouseEvent) {
    if (this.game.inProgress) return;
    if ((event.offsetX >= 0 && event.offsetX <= 16) && (event.offsetY >= 0 && event.offsetY <= 16)) {
      this.game.start();
    }
  }

  private checkRequestedMove() {
    const levelMap = this.game.level.map;

    const row = Math.round(this.requestedPosition.y/32);
    const col = Math.round(this.requestedPosition.x/32);

    if (!levelMap[row] || !levelMap[row][col]) {
      return;
    }
    
    switch (levelMap[row][col]) {
      case '0':
        this.game.end(true);
        this.currentPosition = { x: 0, y: 0 };
        break;
      case 'N':
        this.game.nextLevel();
        this.currentPosition = { x: 0, y: 0 };
        break;
      case 'E':
        this.game.end();
        this.currentPosition = { x: 0, y: 0 };
        break;
      default:
        this.currentPosition = this.requestedPosition;
    }
  }
}
