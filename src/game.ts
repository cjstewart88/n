import { Assets } from './assets';
import { Engine } from './engine';
import { Player } from './player';

export class Game {
  public assets: Assets;
  public engine: Engine;
  public player: Player;
  public level: string = 'one';

  constructor() {
    this.assets = new Assets(() => {
      this.player = new Player(this);
      this.engine = new Engine(this);
    });
  }
}

const game = new Game();
