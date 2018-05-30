import { Game } from './game';

export class Player {
  private currentPosition = { x: 0, y: 0 };
  private requestedPosition: { x: number, y: number } | undefined;
  private alreadyVisited: any[] = [];
  private level: any;
  
  constructor(game: Game) {
    this.level = game.level;

    document.getElementById('level')
      .addEventListener('click', this.requestMove.bind(this));
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
      { id: 1, x: this.currentPosition.x - 1, y: this.currentPosition.y - 1 },
      { id: 2, x: this.currentPosition.x, y: this.currentPosition.y - 1 },
      { id: 3, x: this.currentPosition.x + 1, y: this.currentPosition.y - 1 },
      { id: 4, x: this.currentPosition.x + 1, y: this.currentPosition.y },
      { id: 5, x: this.currentPosition.x + 1, y: this.currentPosition.y + 1 },
      { id: 6, x: this.currentPosition.x, y: this.currentPosition.y + 1 },
      { id: 7, x: this.currentPosition.x - 1, y: this.currentPosition.y + 1 },
      { id: 8, x: this.currentPosition.x - 1, y: this.currentPosition.y }
    ];

    let impossibleMoves: number[] = [];
    possibleMoves.forEach((pm, i, array) => {
      if (pm.x === -1 || pm.y === -1) {
        impossibleMoves.push(pm.id);
      } else if (this.level[pm.y][pm.x] === 'W') {
        impossibleMoves.push(pm.id);
      } else if (this.alreadyVisited.indexOf(`${pm.x},${pm.y}`) !== -1) {
        impossibleMoves.push(pm.id);
      }
    });
    
    let closestMove: any;
    possibleMoves.forEach(possibleMove => {
      if (impossibleMoves.indexOf(possibleMove.id) !== -1) {
        return;
      }

      if (!closestMove) {
        closestMove = possibleMove;
      }

      possibleMove.distanceFromRequestedMove = Math.abs(possibleMove.x - this.requestedPosition.x) + Math.abs(possibleMove.y - this.requestedPosition.y);

      if (possibleMove.distanceFromRequestedMove < closestMove.distanceFromRequestedMove) {
        closestMove = possibleMove;
      }
    });

    this.alreadyVisited.push(`${closestMove.x},${closestMove.y}`);

    this.level[this.currentPosition.y][this.currentPosition.x] = 'E';  
    this.currentPosition.x = closestMove.x;
    this.currentPosition.y = closestMove.y;
    this.level[this.currentPosition.y][this.currentPosition.x] = 'P';

    if (this.currentPosition.x === this.requestedPosition.x && this.currentPosition.y === this.requestedPosition.y) {
      this.requestedPosition = undefined;
      this.alreadyVisited = [];
    }
  }

  private requestMove(event: MouseEvent) {
    this.requestedPosition = {
      x: Math.floor(event.offsetX/10),
      y: Math.floor(event.offsetY/10)
    }
  }
}
