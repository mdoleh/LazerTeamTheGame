import PlayerHelper from '../helpers/playerHelper';
import SpriteHelper from '../helpers/spriteHelper';

export default class TileScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    enemy: SpriteHelper = new SpriteHelper({ 
        spriteKey: 'enemy',
        spriteSheetSrc: 'src/assets/images/simple-animation.png',
        frameDimensions: { width: 32, height: 48 },
        frameCount: 4 },
        { x: 50, y: 50 });

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.load.image('tiles', 'src/assets/images/super_mario.png');
        this.load.tilemapTiledJSON('map', 'src/assets/tilemaps/tutorial_map.json');
        this.enemy.preload(this.load);
    }

    create() {
        // must use embedded tilesets in map JSON
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('super_mario', 'tiles');
        const layers: Phaser.Tilemaps.TilemapLayer[] = [];
        for (let i = 0; i < map.layers.length; ++i) {
            layers.push(map.createLayer(map.layers[i].name, tiles, 0, 0));
        }
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = PlayerHelper.create(this.physics, this.anims);
        const enemy = this.enemy.create(this.physics, this.anims);
        this.physics.add.existing(this.player);
        for (const layer of layers) {
            map.setCollisionByProperty({ hasCollisions: true });
            this.physics.add.collider(this.player, layer);
        }

        this.physics.add.collider(this.player, enemy);
    }

    update() {
        PlayerHelper.update(this.player, this.cursors);
    }
}