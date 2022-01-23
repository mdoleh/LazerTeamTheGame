import PlayerGenerator from '../generators/sprites/playerGenerator';
import playerData from '../assets/tilemaps/players.json';
import { PlayerSpriteData } from '../interfaces/spriteData';

export default class Tutorial extends Phaser.Scene {
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    stars: Phaser.Physics.Arcade.Group;
    bombs: Phaser.Physics.Arcade.Group;
    scoreText: Phaser.GameObjects.Text;
    score: number = 0;
    playerGenerator: PlayerGenerator = new PlayerGenerator(playerData[0] as PlayerSpriteData)

    constructor() {
        super({key: 'Tutorial'});
    }

    preload() {

    }

    create() {
        this.add.image(400, 300, 'sky');
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });
        
        this.platforms = this.physics.add.staticGroup();
      
        this.platforms.add(new Phaser.GameObjects.TileSprite(this, 400, 568, 800, 64, 'ground'));
        // this.platforms.create(400, 568, 'ground').setDisplaySize(800, 64).refreshBody();
      
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.playerGenerator.create(this.physics, this.anims);
      
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
      
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
      
        this.stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
      
        this.bombs = this.physics.add.group();
      
        this.physics.add.collider(this.bombs, this.platforms);
      
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        this.physics.world.setBounds(0, 0, 800 * 4, 600 * 4);
        this.cameras.main.setBounds(0, 0, 800 * 4, 600 * 4);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(100, 100);
    }

    update() {
        this.playerGenerator.update(this.player, this.cursors);
    }

    collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
        star.disableBody(true, true);
    
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
                child.enableBody(true, child.x, 0, true, true);
            });
    
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    
    hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: any) {
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play('turn');
    }
}