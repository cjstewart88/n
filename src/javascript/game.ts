import { Assets } from './assets';
import { Engine } from './engine';
import { Player } from './player';
import { Levels } from './levels/levels';

export class Game {
  public assets: Assets;
  public engine: Engine;
  public player: Player;
  public level: any;

  constructor() {
    this.assets = new Assets(() => {
      this.player = new Player(this);
      this.setLevel({ name: 'one' });
      this.engine = new Engine(this);
    });
  }

  public setLevel(opts: { name?: string, direction?: 'next' | 'previous' }) {
    let setLevelTo: string;

    if (opts.name) {
      setLevelTo = opts.name;
    } else {
      setLevelTo = this.level[`${opts.direction}Level`];
    }

    this.level = Levels[setLevelTo];

    if (opts.direction) {
      if (opts.direction === 'previous') {
        this.player.currentPosition = this.level.nextLevelCordinates;
      } else {
        this.player.currentPosition = { x: 0, y: 0 };
      }
    }
  }
}

const game = new Game();
