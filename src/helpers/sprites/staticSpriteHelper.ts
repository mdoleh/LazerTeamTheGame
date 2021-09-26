import { Position } from "../../interfaces/position";
import { SourceKeyPair } from "../../interfaces/sourceKeyPair";

export default class StaticSpriteHelper {
    spriteKeySource: SourceKeyPair
    position: Position

    constructor(spriteKeySource: SourceKeyPair, position: Position) {
        this.spriteKeySource = spriteKeySource;
        this.position = position;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        const { key, src } = this.spriteKeySource
        load.image(key, src);
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics): Phaser.Physics.Arcade.Sprite {
        const { key } = this.spriteKeySource;
        const sprite = physics.add.staticSprite(this.position.x, this.position.y, key);
        return sprite;
    }
}