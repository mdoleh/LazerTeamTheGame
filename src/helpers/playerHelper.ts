export default class PlayerHelper {
    static preload(load: Phaser.Loader.LoaderPlugin) {
        load.spritesheet('dude', 
            'src/assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    static create(player: Phaser.Physics.Arcade.Sprite, 
        physics: Phaser.Physics.Arcade.ArcadePhysics, 
        anims: Phaser.Animations.AnimationManager) : Phaser.Physics.Arcade.Sprite {
        player = physics.add.sprite(0, 0, 'dude');
    
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        
        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        return player;
    }

    static update(player: Phaser.Physics.Arcade.Sprite, 
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