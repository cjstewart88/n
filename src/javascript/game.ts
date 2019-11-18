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

  private startTime: number;

  constructor() {
    this.assets = new Assets(() => {
      this.player = new Player(this);
      this.setLevel('one');
      this.engine = new Engine(this);
    });
  }

  public setLevel(name?: string) {
    let setLevelTo: string;

    if (name) {
      setLevelTo = name;
    } else {
      setLevelTo = this.level.nextLevel;
    }

    this.level = Levels[setLevelTo];
    this.player.currentPosition = { x: 0, y: 0 };
  }

  public start() {
    this.inProgress =  true;
    this.startTime = Date.now();
    this.setGameCopy('Times ticking... get to the choppa.')
  }

  public end() {
    this.setGameCopy(`It took you ${this.secondsToComplete()} seconds. You can do better,  press 'Enter' to give it another go.`);
    this.inProgress =  false;
    this.setLevel('one');
  }

  private setGameCopy(copy: string) {
    document.getElementsByClassName('game-copy')[0].innerHTML = copy;
  }

  private secondsToComplete() {
    return Math.floor((Date.now() - this.startTime)/1000);
  }
}

const game = new Game();
