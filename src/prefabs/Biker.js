class Biker extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, 1)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.parentScene = scene; 
        //sets collision body to circle
        this.body.setCircle(this.width/2)
        //this.body.setCollideWorldBounds(true)

        //this.body.setBounce(1.0)
        //this.setGravityY(50);
        this.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        this.destroyed = false;       // custom property to track paddle life
    }

    update()
    {
        if(keyRIGHT.isDown || keyRIGHT2.isDown)
        {
            
            if (!this.anims.isPlaying) {
                // Animation is complete, do something here
                this.play('drive')
            }
            this.parentScene.sky.tilePositionX += 10
            this.setVelocityX(200)
        }
        else
        {
            //DAMP FACTOR is 0.9
            
            this.setVelocityX(this.body.velocity.x * 0.9)
        }

        /*if(this.y>height)
        {
            //this.gg()
        }*/
    }

    gg()
    {
            this.parentScene.bkSong.stop()
            this.parentScene.scene.start('gameOverScene')
    }

}