export class Player {
  public currentPosition = { x: 0, y: 0 };
  public requestedPosition: { x: number, y: number } | undefined;
  private alreadyVisited: any[] = [];

  constructor() {
    window.addEventListener('click', this.requestMove.bind(this));
  }

  public get moving(): boolean {
    return this.requestedPosition !== undefined;
  }

  public get idle(): boolean {
    return this.requestedPosition === undefined;
  }

  public move() {
    if (this.idle) return;

    let possibleMoves: any[] = [
      { id: 1, x: this.currentPosition.x - 10, y: this.currentPosition.y - 10 },
      { id: 2, x: this.currentPosition.x, y: this.currentPosition.y - 10 },
      { id: 3, x: this.currentPosition.x + 10, y: this.currentPosition.y - 10 },
      { id: 4, x: this.currentPosition.x + 10, y: this.currentPosition.y },
      { id: 5, x: this.currentPosition.x + 10, y: this.currentPosition.y + 10 },
      { id: 6, x: this.currentPosition.x, y: this.currentPosition.y + 10 },
      { id: 7, x: this.currentPosition.x - 10, y: this.currentPosition.y + 10 },
      { id: 8, x: this.currentPosition.x - 10, y: this.currentPosition.y }
    ];

    let impossibleMoves: number[] = [];
    possibleMoves.forEach((pm, i, array) => {
      // 250, 210
      if ((pm.x >= 200 && pm.x < 300) && (pm.y >= 200 && pm.y < 210)) {
        impossibleMoves.push(pm.id);
      } else if (this.alreadyVisited.indexOf(`${pm.x},${pm.y}`) !== -1) {
        impossibleMoves.push(pm.id);
      }
    });

    let closestMove = possibleMoves[0];
    possibleMoves.forEach(possibleMove => {
      possibleMove.distanceFromRequestedMove = Math.abs(possibleMove.x - this.requestedPosition.x) + Math.abs(possibleMove.y - this.requestedPosition.y);

      if (impossibleMoves.indexOf(possibleMove.id) === -1 && possibleMove.distanceFromRequestedMove < closestMove.distanceFromRequestedMove) {
        closestMove = possibleMove;
      }
    });

    this.alreadyVisited.push(`${closestMove.x},${closestMove.y}`);
    this.currentPosition.x = closestMove.x;
    this.currentPosition.y = closestMove.y;

    if (this.currentPosition.x === this.requestedPosition.x && this.currentPosition.y === this.requestedPosition.y) {
      this.requestedPosition = undefined;
      this.alreadyVisited = [];
    }
  }

  private requestMove(event: MouseEvent) {
    this.requestedPosition = {
      x: Math.round(event.clientX / 10) * 10,
      y:  Math.round(event.clientY / 10) * 10
    }
  }
}
