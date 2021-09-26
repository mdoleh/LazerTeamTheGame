export default class ObstacleHelper {
    jsonSrc: any;

    constructor(jsonSrc: any) {
        this.jsonSrc = jsonSrc;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        for (const spriteData of this.jsonSrc) {
            const { animation } = spriteData;
            const { frameDimensions } = animation;
            load.spritesheet(
                animation.spriteKey, 
                animation.spriteSheetSrc,
                { frameWidth: frameDimensions.width, frameHeight: frameDimensions.height });
        }
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics,
        anims: Phaser.Animations.AnimationManager): Phaser.Physics.Arcade.Sprite[] {
        const sprites = [];

        for (const spriteData of this.jsonSrc) {
            const { animation, position } = spriteData;
            const sprite = physics.add.staticSprite(position.x, position.y, animation.spriteKey);
            sprites.push(sprite);

            if (!anims.exists(animation.spriteKey)) {
                anims.create({
                    key: animation.spriteKey,
                    frames: anims.generateFrameNumbers(animation.spriteKey, { start: 0, end: animation.frameCount - 1 }),
                    frameRate: 10,
                    repeat: 0
                });
            }
        }
        return sprites;
    }
}