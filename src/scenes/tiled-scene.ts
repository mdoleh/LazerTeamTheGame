import ObstacleHelper from '../helpers/sprites/obstacleHelper';
import PlayerHelper from '../helpers/playerHelper';
import AnimatedSpriteHelper from '../helpers/sprites/animatedSpriteHelper';
import TileMapHelper from '../helpers/tiledMapHelper';
import spriteData from '../assets/tilemaps/tutorial_sprites.json'
import { AnimationType } from '../interfaces/animation';

export default class TileScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spriteMaker: AnimatedSpriteHelper = new AnimatedSpriteHelper({ 
        key: 'enemy',
        spriteSheetSrc: 'src/assets/images/simple-animation.png',
        frameDimensions: { width: 32, height: 48 },
        frameCount: 4,
        repeat: -1 },
        { x: 50, y: 50 });
    mapHelper: TileMapHelper = new TileMapHelper(
        { key: 'tiles', src: 'src/assets/images/super_mario.png' }, 
        { key: 'map', src: 'src/assets/tilemaps/tutorial_map.json' });
    obstacleHelper: ObstacleHelper = new ObstacleHelper(spriteData);

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.mapHelper.preload(this.load);
        this.spriteMaker.preload(this.load);
        this.obstacleHelper.preload(this.load);
    }

    create() {
        const { map, layers } = this.mapHelper.create(this.make, this.cameras.main);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = PlayerHelper.create(this.physics, this.anims);
        const enemy = this.spriteMaker.create(this.physics, this.anims);
        this.physics.add.existing(this.player);
        map.setCollisionByProperty({ hasCollisions: true });
        map.setCollisionByProperty({ destructible: true });
        for (const layer of layers) {
            this.physics.add.collider(this.player, layer, this.destructibleCollision, this.shouldCollide);
        }
        const obstacles = this.obstacleHelper.create(this.physics, this.anims);
        for (const obstacle of obstacles) {
            this.physics.add.collider(this.player, obstacle, this.explosionCollision)
            obstacle.anims.play(`${obstacle.name}_${AnimationType.STATIC}`, true);
        }

        this.physics.add.collider(this.player, enemy);
    }

    update() {
        PlayerHelper.update(this.player, this.cursors);
    }

    explosionCollision(player, obstacle) {
        obstacle.anims.play(`${obstacle.name}_${AnimationType.DESTROYED}`, true);
    }

    destructibleCollision(player, block) {
        if (block?.properties?.destructible) {
            block.setVisible(false);
            block.destroy();
        }
    }

    shouldCollide(player, block) {
        // destroyed objects do not have properties set
        return !!block.properties;
    }
}