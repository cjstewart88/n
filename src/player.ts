import { Game } from './game';

export class Player {
  public currentPosition: { x: number, y: number };
  public requestedPosition: { x: number, y: number } | undefined;

  constructor(game: Game) {
    document.getElementById('level')
      .addEventListener('click', this.move.bind(this));
  }

  private move(event: MouseEvent) {
    this.requestedPosition = {
      x: Math.floor(event.offsetX/32),
      y: Math.floor(event.offsetY/32)
    }
  }
}
