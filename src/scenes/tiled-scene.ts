import SpriteGenerator from '../helpers/sprites/spriteGenerator';
import PlayerHelper from '../helpers/playerHelper';
import TileMapHelper from '../helpers/tiledMapHelper';
import spriteData from '../assets/tilemaps/tutorial_sprites.json'
import { AnimationType } from '../interfaces/animation';

export default class TileScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    mapHelper: TileMapHelper = new TileMapHelper(
        [{ key: 'super_mario', src: 'src/assets/images/super_mario.png' }, 
        { key: 'zelda-tiles', src: 'src/assets/images/zelda-tiles.png' }], 
        { key: 'map', src: 'src/assets/tilemaps/tutorial_map.json' });
    spriteGenerator: SpriteGenerator = new SpriteGenerator(spriteData);

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.mapHelper.preload(this.load);
        this.spriteGenerator.preload(this.load);
    }

    create() {
        const { map, layers } = this.mapHelper.create(this.make, this.cache, this.cameras.main);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = PlayerHelper.create(this.physics, this.anims);
        this.physics.add.existing(this.player);
        map.setCollisionByProperty({ hasCollisions: true });
        map.setCollisionByProperty({ destructible: true });
        for (const layer of layers) {
            this.physics.add.collider(this.player, layer, this.destructibleCollision, this.shouldCollide);
        }
        const obstacles = this.spriteGenerator.create(this.physics, this.anims);
        for (const obstacle of obstacles) {
            this.physics.add.collider(this.player, obstacle, this.animatedDestruction)
            obstacle.anims.play(`${obstacle.name}_${AnimationType.STATIC}`, true);
        }
    }

    update() {
        PlayerHelper.update(this.player, this.cursors);
    }

    animatedDestruction(player: Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
        const key = `${obstacle.name}_${AnimationType.DESTROYED}`;
        if (obstacle.scene.anims.exists(key)) {
            obstacle.anims.play(key, true);
            obstacle.on('animationcomplete', () => {
                obstacle.setVisible(false);
                obstacle.destroy();
            })
        }
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