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
            if (pointer.leftButtonDown() && keyRIGHT.isDown || keyRIGHT2.isDown) {
                this.setFrame(3)
            }
        })

        /*scene.input.on('pointerup', (pointer)=> {
            this.setFrame(1)
        })*/
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
        //console.log(this.x, this.y)
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
            this.setVelocityY(-18)
            // Set a delay before allowing input again
            this.iTimer = time + 1000; // 500 milliseconds delay
        }
        

        this.parentScene.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                if ((pair.bodyA === this.body && pair.bodyB === this.parentScene.polygonBody) || (pair.bodyA === this.parentScene.polygonBody && pair.bodyB === this.body)) {
                    // Calculate the angle of the surface
                    const normalizedCollision = pair.collision.normal

                    const angle = -89+Phaser.Math.RadToDeg(Math.atan2(normalizedCollision.y, normalizedCollision.x));
                    //console.log(Phaser.Math.RadToDeg(Math.atan2(normalizedCollision.y, normalizedCollision.x)))
                    //console.log(angle);
                    this.setRotation(angle);
                    // Apply the angle to the player sprite's rotation
                    
                }
                else if ((pair.bodyA === this.body && pair.bodyB === this.parentScene.hill2Vs) || (pair.bodyA === this.parentScene.hill2Vs && pair.bodyB === this.body)) {
                    // Calculate the angle of the surface
                    const normalizedCollision = pair.collision.normal

                    const angle = -45+Phaser.Math.RadToDeg(Math.atan2(normalizedCollision.y, normalizedCollision.x));
                    //console.log(Phaser.Math.RadToDeg(Math.atan2(normalizedCollision.y, normalizedCollision.x)))
                    //console.log(angle);
                    this.setRotation(-32);
                    // Apply the angle to the player sprite's rotation
                    
                }
                else
                {
                    this.setRotation(0);
                }
            })})

        

        if(this.x> 3950)
        {
            this.parentScene.bkSong.stop()
            this.parentScene.scene.start('winScene')
        }
    }

   

    gg()
    {
            this.parentScene.bkSong.stop()
            this.parentScene.scene.start('gameOverScene')
    }

}