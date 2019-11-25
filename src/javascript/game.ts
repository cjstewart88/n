import { Assets } from './assets';
import { Engine } from './engine';
import { Player } from './player';
import { Levels } from './levels/levels';

export class Game {
  public assets: Assets;
  public engine: Engine;
  public player: Player;
  public level: any;
  public inProgress = false;
  public crying = false;

  private startTime: number;

  constructor() {
    this.assets = new Assets(() => {
      this.player = new Player(this);
      this.level = Levels.one;
      this.engine = new Engine(this);
    });

    document.getElementsByTagName('button')[0].addEventListener('click', (e) => {
      this.crying = !this.crying;
      e.srcElement.innerHTML = (this.crying ? 'Please make it stop.' : 'Make me cry.');
    });
  }

  public nextLevel() {
    this.inProgress =  false;
    this.setGameCopy(`Level ${this.level.name} complete... times still ticking... click on the red box to keep going`);
    this.level = Levels[this.level.nextLevel];
  }

  public start() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    this.inProgress =  true;
    this.setGameCopy('Times ticking... get to the choppa.')
  }

  public end(died?: boolean) {
    if (died) {
      this.setGameCopy(`You fell into the void... times still ticking, click on the red box to give it another go.`);
    } else {
      this.setGameCopy(`It took you ${this.timeToComplete} seconds. You can do better, click on the red box to give it another go.`);
      this.level = Levels.one;
      this.startTime = null;
    }

    this.inProgress =  false;
  }

  public updateTimeDisplay() {
    if (this.startTime) {
      document.getElementsByClassName('time')[0].innerHTML = `${this.timeToComplete} seconds `;
    }
  }

  private setGameCopy(copy: string) {
    document.getElementsByClassName('game-copy')[0].innerHTML = copy;
  }

  private get timeToComplete(): any {
    return Math.floor((Date.now() - this.startTime)/1000);
  }
}

const game = new Game();
