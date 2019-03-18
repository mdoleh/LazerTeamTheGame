/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import lang from '../lang'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const bannerText = lang.text('title');
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    });
    banner.inputEnabled = true;
    banner.events.onInputUp.add(item => this.state.start('TestLevel'), this);
    banner.events.onInputOver.add(item => item.fill = '#ff0044', this);
    banner.events.onInputOut.add(item => item.fill = '#77BFA3', this);

    banner.anchor.setTo(0.5);

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    });

    this.game.add.existing(this.mushroom);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
