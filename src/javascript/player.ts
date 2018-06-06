import { Game } from './game';

export class Player {
  public currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  public requestedPosition: { x: number, y: number } | undefined;

  private game: Game;

  constructor(game: Game) {
    this.game = game;

    window.addEventListener('keydown', this.handleControls.bind(this))
  }

  private handleControls(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.requestedPosition = { x: this.currentPosition.x - 1, y: this.currentPosition.y }
        break;
      case 'ArrowRight':
        this.requestedPosition = { x: this.currentPosition.x + 1, y: this.currentPosition.y }
        break;
      case 'ArrowUp':
        this.requestedPosition = { x: this.currentPosition.x, y: this.currentPosition.y - 1 }
        break;
      case 'ArrowDown':
        this.requestedPosition = { x: this.currentPosition.x, y: this.currentPosition.y + 1 }
        break;
    }

    this.checkRequestedMove();
  }

  private checkRequestedMove() {
    const levelMap = this.game.level.map;

    if (!levelMap[this.requestedPosition.y] || !levelMap[this.requestedPosition.y][this.requestedPosition.x]) {
      return;
    }

    switch (levelMap[this.requestedPosition.y][this.requestedPosition.x]) {
      case '0':
        this.requestedPosition = undefined;
        break;
      case 'N':
        this.game.setLevel({ direction: 'next' });
        break;
      case 'P':
        this.game.setLevel({ direction: 'previous' });
        break;
      default:
        this.currentPosition = this.requestedPosition;
    }
  }
}
