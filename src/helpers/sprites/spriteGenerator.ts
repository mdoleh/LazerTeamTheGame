import { SpriteData } from '../../interfaces/spriteData';
import { Animation } from '../../interfaces/animation'

export default class SpriteGenerator {
    jsonSrc: SpriteData[];
    spriteSheetMap: any = {};

    constructor(jsonSrc: any) {
        this.jsonSrc = jsonSrc;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        for (const spriteData of this.jsonSrc) {
            const { animations } = spriteData;

            for (const prop in animations) {
                const animation = animations[prop] as Animation;
                const { frameDimensions } = animation;
                if (this.spriteSheetMap[animation.spriteSheetKey] && this.spriteSheetMap[animation.spriteSheetKey] !== animation.spriteSheetSrc) {
                    console.error('Attempted to load a Spritesheet with an existing spriteSheetKey but different spriteSheetSrc:', spriteData);
                }
                this.spriteSheetMap[animation.spriteSheetKey] = animation.spriteSheetSrc;
                load.spritesheet(
                    animation.spriteSheetKey, 
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
                const animationKey = `${spriteKey}_${prop}`;
                if (!anims.exists(animationKey)) {
                    anims.create({
                        key: animationKey,
                        frames: anims.generateFrameNumbers(animation.spriteSheetKey, { start: 0, end: animation.frameCount - 1 }),
                        frameRate: 10,
                        repeat: animation.repeat
                    });
                }
            }
        }
        return sprites;
    }
}