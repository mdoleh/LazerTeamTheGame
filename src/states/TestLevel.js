/* globals __DEV__ */
import Phaser from 'phaser'
var platforms;

export default class extends Phaser.State {
  init() { }
  preload() { 
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    // TODO: figure out why this isn't working
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(this.world.centerX, this.world.centerY, 'dude');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.game.add.existing(this.player);
    this.player.body.setGravity(300);
    this.player.setColliderWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
  }

  update() {
    if (this.cursors.up.isDown){
      this.player.move(0, -1);
    }

    if (this.cursors.down.isDown){
      this.player.move(0, 1);
    }

    if (this.cursors.left.isDown){
      this.player.move(-1, 0);
    }

    if (this.cursors.right.isDown){
      this.player.move(1, 0);
    }
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
