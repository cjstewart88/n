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
      case 'Enter':
        this.game.start();
        break;
      case 'ArrowLeft':
        if (!this.game.inProgress) return;
        this.requestedPosition = { x: this.currentPosition.x - 1, y: this.currentPosition.y }
        this.checkRequestedMove();
        break;
      case 'ArrowRight':
          if (!this.game.inProgress) return;
        this.requestedPosition = { x: this.currentPosition.x + 1, y: this.currentPosition.y }
        this.checkRequestedMove();
        break;
      case 'ArrowUp':
          if (!this.game.inProgress) return;
        this.requestedPosition = { x: this.currentPosition.x, y: this.currentPosition.y - 1 }
        this.checkRequestedMove();
        break;
      case 'ArrowDown':
          if (!this.game.inProgress) return;
        this.requestedPosition = { x: this.currentPosition.x, y: this.currentPosition.y + 1 }
        this.checkRequestedMove();
        break;
    }
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
        this.game.setLevel();
        break;
      case 'E':
        this.game.end();
        break;
      default:
        this.currentPosition = this.requestedPosition;
    }
  }
}
