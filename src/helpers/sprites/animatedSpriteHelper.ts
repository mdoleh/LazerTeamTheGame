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
        const { key, spriteSheetSrc, frameDimensions: dimensions } = this.animation;

        load.spritesheet(
            key, 
            spriteSheetSrc,
            { frameWidth: dimensions.width, frameHeight: dimensions.height }
        );
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics, 
        anims: Phaser.Animations.AnimationManager): Phaser.Physics.Arcade.Sprite {
        const { key, frameCount } = this.animation;
        const sprite = physics.add.staticSprite(this.position.x, this.position.y, key);

        anims.create({
            key: key,
            frames: anims.generateFrameNumbers(key, { start: 0, end: frameCount - 1 }),
            frameRate: 10,
            repeat: -1
        });
        sprite.anims.play(key, true);
        return sprite;
    }
}