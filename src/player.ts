import { Game } from './game';

export class Player {
  public currentPosition = { x: 0, y: 0 };
  public requestedPosition: { x: number, y: number } | undefined;
  
  constructor(game: Game) {
    document.getElementById('level')
      .addEventListener('click', this.move.bind(this));
  }

  private move(event: MouseEvent) {
    this.requestedPosition = {
      x: Math.floor(event.offsetX/10),
      y: Math.floor(event.offsetY/10)
    }
  }
}
