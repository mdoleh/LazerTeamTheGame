import Phaser from "phaser";

export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function BootScene() {
        Phaser.Scene.call (this, {key: 'BootScene'});
    },

    preload: function() {
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/platform.png');
        this.load.image('star', 'src/assets/star.png');
        this.load.image('bomb', 'src/assets/bomb.png');
        this.load.spritesheet('dude', 
            'src/assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    },

    create: function() {
        this.scene.start("Tutorial");
    }
});