export class Player {
  public currentPosition = { x: 0, y: 0 };
  public requestedPosition = { x: 0, y: 0};
  public moveInProgress: boolean = false;
  public gold: number = 0;

  constructor() {
    window.addEventListener('click', this.requestMove.bind(this));
  }

  private requestMove(event: MouseEvent) {
    this.requestedPosition.x = Math.round(event.clientX / 10) * 10;
    this.requestedPosition.y = Math.round(event.clientY / 10) * 10;
    this.moveInProgress = true;
  }
}
