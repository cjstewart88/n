import { Engine } from './engine';
import { Player } from './player';

class Game {
  public engine: Engine;
  public players: Player[];

  constructor() {
    this.connect();

    this.engine = new Engine({
      players: this.players
    });
  }

  public connect() {
    this.players = [];
  }

  public join() {
    const player = new Player();
    this.players.push(player);
  }
}

const game = new Game();
game.join();
