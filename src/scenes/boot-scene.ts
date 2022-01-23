export default class BootScene extends Phaser.Scene {
    
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        // this.load.image('sky', 'src/assets/sky.png');
        // this.load.image('ground', 'src/assets/platform.png');
        // this.load.image('star', 'src/assets/star.png');
        // this.load.image('bomb', 'src/assets/bomb.png');
    }

    create() {
        this.scene.start('Tiled');
    }
}