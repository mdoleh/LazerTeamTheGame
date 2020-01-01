export default class BootScene extends Phaser.Scene {
    
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        this.load.image('sky', 'src/assets/sky.png');
        this.load.image('ground', 'src/assets/platform.png');
        this.load.image('star', 'src/assets/star.png');
        this.load.image('bomb', 'src/assets/bomb.png');
        this.load.spritesheet('dude', 
            'src/assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.scene.start("Tutorial");
    }
}