import SpriteGenerator from '../generators/sprites/spriteGenerator';
import PlayerGenerator from '../generators/sprites/playerGenerator';
import TileMapGenerator from '../generators/tileMapGenerator';
import spriteData from '../assets/tilemaps/tutorial_sprites.json'
import playerData from '../assets/tilemaps/players.json';
import { AnimationType } from '../interfaces/animation';
import { PlayerSpriteData } from '../interfaces/spriteData';

export default class TileScene extends Phaser.Scene {
    players: Phaser.Physics.Arcade.Sprite[];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    mapHelper: TileMapGenerator = new TileMapGenerator(
        [{ key: 'super_mario', src: 'src/assets/images/super_mario.png' }, 
        { key: 'zelda-tiles', src: 'src/assets/images/zelda-tiles.png' }], 
        { key: 'map', src: 'src/assets/tilemaps/tutorial_map.json' });
    spriteGenerator: SpriteGenerator = new SpriteGenerator(spriteData);
    playerGenerators: PlayerGenerator[] = playerData.map((x: PlayerSpriteData) => new PlayerGenerator(x))

    constructor() {
        super({key: 'Tiled'});
    }

    preload() {
        this.mapHelper.preload(this.load);
        this.spriteGenerator.preload(this.load);
        this.playerGenerators.forEach(x => x.preload(this.load));
    }

    create() {
        const { map, layers } = this.mapHelper.create(this.make, this.cache, this.cameras.main);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.players = this.playerGenerators.map(x => x.create(this.physics, this.anims));
        this.players.forEach(player => this.physics.add.existing(player));
        map.setCollisionByProperty({ hasCollisions: true });
        map.setCollisionByProperty({ destructible: true });
        for (const layer of layers) {
            for (const player of this.players) {
                this.physics.add.collider(player, layer, this.destructibleCollision, this.shouldCollide);
            }
        }
        const obstacles = this.spriteGenerator.create(this.physics, this.anims);
        for (const obstacle of obstacles) {
            for (const player of this.players) {
                this.physics.add.collider(player, obstacle, this.animatedDestruction)
            }
            obstacle.anims.play(`${obstacle.name}_${AnimationType.STATIC}`, true);
        }
    }

    update() {
        this.playerGenerators.forEach((x, idx) => x.update(this.players[idx], this.cursors));
    }

    animatedDestruction(player: Phaser.Physics.Arcade.Sprite, obstacle: Phaser.Physics.Arcade.Sprite) {
        const key = `${obstacle.name}_${AnimationType.DESTROYED}`;
        if (obstacle.scene.anims.exists(key)) {
            obstacle.anims.play(key, true);
            obstacle.on('animationcomplete', () => {
                obstacle.setVisible(false);
                obstacle.destroy();
            })
        } else {
            console.error('No matching animation was found for key: ', key);
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