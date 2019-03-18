/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init() { }
  preload() { 
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    // Here we create the ground.
    let ground = this.platforms.create(0, game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // this.player = this.physics.add.sprite(this.world.centerX, this.world.centerY, 'dude');
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');
    this.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.collideWorldBounds = true;

    // key, frame indexes, frameRate, loop
    this.player.animations.add('left', [0, 1, 2, 3], 10, false);
    this.player.animations.add('right', [5, 6, 7, 8], 10, false);
    this.player.animations.add('turn', [4], 10, false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.physics.arcade.collide(this.player, this.platforms);

    if (this.cursors.left.isDown){
      this.player.animations.play('left');
    }

    if (this.cursors.right.isDown){
        this.player.animations.play('right');
    }
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
