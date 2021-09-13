import PlayerHelper from '../helpers/playerHelper';

export default class TileScene extends Phaser.Scene {
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.load.image('tiles', 'src/assets/images/super_mario.png');
        this.load.tilemapTiledJSON('map', 'src/assets/tilemaps/tutorial_map.json');
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
        this.player = PlayerHelper.create(this.player, this.physics, this.anims);
        this.physics.add.existing(this.player);
        for (const layer of layers) {
            map.setCollisionFromCollisionGroup(true);
            map.setCollisionByProperty({ hasCollisions: true });
            this.physics.add.collider(this.player, layer);
        }
    }

    update() {
        PlayerHelper.update(this.player, this.cursors);
    }
}