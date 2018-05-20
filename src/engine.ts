import { Player} from './player';

class Engine {
  public player: Player;

  constructor() {
    this.player = new Player({ name: 'Noah' });
    this.greet();
  }

  private greet(): void {
    console.log(`Hello, ${this.player.name}!`)
  }
}

new Engine();