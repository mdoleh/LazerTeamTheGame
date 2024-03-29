import 'phaser';

import BootScene from './scenes/boot-scene';
import Tutorial from './scenes/tutorial';
import TileScene from './scenes/tiled-scene';

export default {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        BootScene,
        Tutorial,
        TileScene
    ]
};