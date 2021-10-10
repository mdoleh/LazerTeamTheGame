import { SpriteData } from "../../interfaces/spriteData";
import { Animation } from "../../interfaces/animation"

export default class ObstacleHelper {
    jsonSrc: SpriteData[];

    constructor(jsonSrc: any) {
        this.jsonSrc = jsonSrc;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        for (const spriteData of this.jsonSrc) {
            const { animations } = spriteData;

            for (const prop in animations) {
                const animation = animations[prop] as Animation;
                const { frameDimensions } = animation;
                load.spritesheet(
                    animation.key, 
                    animation.spriteSheetSrc,
                    { frameWidth: frameDimensions.width, frameHeight: frameDimensions.height });
            }
        }
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics,
        anims: Phaser.Animations.AnimationManager): Phaser.Physics.Arcade.Sprite[] {
        const sprites: Phaser.Physics.Arcade.Sprite[] = [];

        for (const spriteData of this.jsonSrc) {
            const { animations, positions, spriteKey } = spriteData;
            for (const position of positions) {
                const sprite = physics.add.staticSprite(position.x, position.y, spriteKey);
                sprite.setName(spriteKey);
                sprites.push(sprite);
            }

            for (const prop in animations) {
                const animation = animations[prop] as Animation;
                if (!anims.exists(animation.key)) {
                    anims.create({
                        key: animation.key,
                        frames: anims.generateFrameNumbers(animation.key, { start: 0, end: animation.frameCount - 1 }),
                        frameRate: 10,
                        repeat: 0
                    });
                }
            }
        }
        return sprites;
    }
}