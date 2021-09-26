import { Animation } from "../../interfaces/animation";
import { Position } from "../../interfaces/position";

export default class AnimatedSpriteHelper {
    animation: Animation
    position: Position

    constructor(animation: Animation, position: Position) {
        this.animation = animation;
        this.position = position;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        const { spriteKey, spriteSheetSrc, frameDimensions: dimensions } = this.animation;

        load.spritesheet(
            spriteKey, 
            spriteSheetSrc,
            { frameWidth: dimensions.width, frameHeight: dimensions.height }
        );
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics, 
        anims: Phaser.Animations.AnimationManager): Phaser.Physics.Arcade.Sprite {
        const { spriteKey, frameCount } = this.animation;
        const sprite = physics.add.staticSprite(this.position.x, this.position.y, spriteKey);

        anims.create({
            key: spriteKey,
            frames: anims.generateFrameNumbers(spriteKey, { start: 0, end: frameCount - 1 }),
            frameRate: 10,
            repeat: -1
        });
        sprite.anims.play(spriteKey, true);
        return sprite;
    }
}