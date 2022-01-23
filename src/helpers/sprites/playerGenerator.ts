import { PlayerSpriteData } from "../../interfaces/spriteData";

export default class PlayerGenerator {
    playerData: PlayerSpriteData;

    constructor(playerData: PlayerSpriteData) {
        this.playerData = playerData;
    }

    preload(load: Phaser.Loader.LoaderPlugin) {
        const { spriteSheetKey, spriteSheetSrc, frameDimensions } = this.playerData.animations;
        load.spritesheet(
            spriteSheetKey,
            spriteSheetSrc,
            { frameWidth: frameDimensions.width, frameHeight: frameDimensions.height }
        );
    }

    create(physics: Phaser.Physics.Arcade.ArcadePhysics, 
        anims: Phaser.Animations.AnimationManager) : Phaser.Physics.Arcade.Sprite {

        const { position, animations, spriteKey } = this.playerData;
        const player = physics.add.sprite(position.x, position.y, spriteKey);
    
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
        for (let component of animations.components) {
            const { startFrame: start, endFrame: end, frameRate, repeat, key } = component;
            anims.create({
                key: key,
                frames: anims.generateFrameNumbers(spriteKey, { start, end }),
                frameRate,
                repeat
            });
        }

        return player;
    }

    update(player: Phaser.Physics.Arcade.Sprite, 
        cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
        
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
        
            player.anims.play('turn');
        }
        
        if (cursors.up.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-250);
        }
    }
}