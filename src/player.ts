export class Player {
  public x: number = 0;
  public y: number = 0;
  public gold: number = 0;

  constructor() {
    window.addEventListener('click', this.movePlayer.bind(this));
  }

  private movePlayer(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
  }
}
