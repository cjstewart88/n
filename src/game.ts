import { Assets } from './assets';
import { Engine } from './engine';
import { Player } from './player';
import { levelOne } from './levels/one';

export class Game {
  public assets: Assets;
  public engine: Engine;
  public player: Player;
  public level: any;

  constructor() {
    this.assets = new Assets(() => {
      this.level = levelOne;
      this.player = new Player(this);
      this.engine = new Engine(this);
    });
  }
}

const game = new Game();
