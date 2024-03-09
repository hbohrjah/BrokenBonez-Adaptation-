class Biker extends Phaser.Physics.Matter.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        //How to make Matter physics sprite abstraction
        //https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220
        super(scene.matter.world, x, y, texture, frame)
        scene.add.existing(this)
        this.setTexture(texture, frame)
        this.parentScene = scene;
        this.setExistingBody(scene.characterBody);
        
        // Optionally, adjust the display size of the sprite
        this.displayWidth = 65;
        this.displayHeight = 65;

        // Optionally, set additional properties for the circular body
        scene.characterBody.restitution = 0.1; // Bounciness
        scene.characterBody.friction = 0.2; // Friction

        this.setFixedRotation(true);
        scene.add.existing(this)
        this.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        this.destroyed = false;       // custom property to track paddle life\
        this.iTimer = 0
        
        scene.input.on('pointerdown', (pointer)=> {
            if (pointer.leftButtonDown() && !this.parentScene.isColliding ) {
                this.setFrame(3)
            }
            else if(pointer.leftButtonDown() && this.parentScene.isColliding)
            {
                 // Play the next frame of the current animation
                this.currentAnimationIndex++;
                if (this.currentAnimationIndex >= this.anims.get('stats').frames.length) {
                    // Wrap around to the first frame if the end is reached
                    this.currentAnimationIndex = 0;
                }
                //this.tempUI = this.add.image(this.cameras.main.width /2, this.cameras.main.height-246, 'statUI', this.currentAnimationIndex)
                //this.statUI.destroy();
                this.statUI.setFrame(this.currentAnimationIndex)
                //this.tempUI.destroy();
                this.statUI.setScale(0.96,0.91)
            }
        })

        
        scene.input.keyboard.on('keydown-D', () => {
            // Set the velocity of the player sprite when the "D" key is pressed
            this.setVelocityX(5); // Set the X velocity to 100 (adjust as needed)
            this.isMoving = true; // Set the flag to true
        });
        scene.input.keyboard.on('keydown-right', () => {
            this.isMoving = true; // Set the flag to true
        });
    }

    update(time)
    {
        if(this.isMoving)
        {
            this.parentScene.sky.tilePositionX += 10
            if(keyRIGHT.isDown || keyRIGHT2.isDown )
            {
                if(!this.parentScene.isColliding)
                {
                    if (!this.anims.isPlaying) {
                    // Animation is complete, do something here
                    this.play('drive')
                }
                this.setVelocityX(5)
            }
            }
            else
            {
                this.setVelocityX(2)
            }
            

            
        }
        else
        {
            //DAMP FACTOR is 0.9
            
            this.setVelocityX(this.body.velocity.x * 0.9)
        }
        /*if(keyLEFT.isDown || keyLEFT2.isDown)
        {
            
            if (!this.anims.isPlaying) {
                // Animation is complete, do something here
                this.play('drive')
            }
            this.parentScene.sky.tilePositionX += 10
            this.setVelocityX(-2)
            //console.log("enter")
            //this.setVelocity(200, 0)
        }*/
        

        if (this.parentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown && time > this.iTimer) 
        {
         // Spacebar is pressed, perform actions
            console.log('Spacebar is pressed');
            if(!this.parentScene.isColliding)
            {
                //this.parentScene.matter.world.setGravity(0)
                this.setVelocityY(-27)
            }
            // Set a delay before allowing input again
            this.iTimer = time + 2000; // 500 milliseconds delay
        }
        

        this.parentScene.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                if ((pair.bodyA === this.body && pair.bodyB === this.parentScene.polygonBody) || (pair.bodyA === this.parentScene.polygonBody && pair.bodyB === this.body)) {
                    // Calculate the angle of the surface
                    const normalizedCollision = pair.collision.normal

                    const angle = -89+Phaser.Math.RadToDeg(Math.atan2(normalizedCollision.y, normalizedCollision.x));
        
                    // Apply the angle to the player sprite's rotation
                    this.setRotation(angle);
                }
                else
                {
                    this.setRotation(0);
                }
            })})

        if(this.y> 500)
        {
            this.parentScene.scene.start('overworldScene')
        }

        if(this.x> 1810)
        {
            this.parentScene.scene.start('overworldScene')
        }
    }

   

    gg()
    {
            this.parentScene.bkSong.stop()
            this.parentScene.scene.start('gameOverScene')
    }

}