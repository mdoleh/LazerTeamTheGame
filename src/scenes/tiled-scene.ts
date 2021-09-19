import PlayerHelper from '../helpers/playerHelper';
import SpriteHelper from '../helpers/spriteHelper';
import TileMapHelper from '../helpers/tiledMapHelper';

export default class TileScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spriteMaker: SpriteHelper = new SpriteHelper({ 
        spriteKey: 'enemy',
        spriteSheetSrc: 'src/assets/images/simple-animation.png',
        frameDimensions: { width: 32, height: 48 },
        frameCount: 4 },
        { x: 50, y: 50 });
    mapHelper: TileMapHelper = new TileMapHelper(
        { key: 'tiles', src: 'src/assets/images/super_mario.png' }, 
        { key: 'map', src: 'src/assets/tilemaps/tutorial_map.json' });

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.mapHelper.preload(this.load);
        this.spriteMaker.preload(this.load);
    }

    create() {
        const { map, layers } = this.mapHelper.create(this.make, this.cameras.main);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = PlayerHelper.create(this.physics, this.anims);
        const enemy = this.spriteMaker.createStatic(this.physics, this.anims);
        this.physics.add.existing(this.player);
        for (const layer of layers) {
            map.setCollisionByProperty({ hasCollisions: true });
            map.setCollisionByProperty({ destructible: true });
            this.physics.add.collider(this.player, layer, this.destructibleCollision, this.shouldCollide);
        }

        this.physics.add.collider(this.player, enemy);
    }

    update() {
        PlayerHelper.update(this.player, this.cursors);
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