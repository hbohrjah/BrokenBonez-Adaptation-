class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    init() {
        this.VEL = 100  // slime velocity constant
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        //will not manipulate maps, ok to be const
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0)
        this.points = 0
        this.currentAnimationIndex = 0
    }

    create() {    
        const map = this.add.tilemap('track1JSON')
        const tileset = map.addTilesetImage('bbTrack-Sheet', 'tilesetImage')
        const bgLayer = map.createLayer('Track', tileset, 0,0).setOrigin(0)
        //bgLayer.setDepth(2)
        bgLayer.setCollisionByProperty(
            {
                collides: true
            }
        )
        this.statUI = this.add.image(this.cameras.main.width /2, this.cameras.main.height-246, 'statUI', 0)
        this.statUI.setScale(0.96,0.91)
        this.statUI.rotation = Phaser.Math.DegToRad(-0.5)

        // add Biker
        const slimeSpawn = map.findObject('Spawns', (obj) => obj.name === 'bikerSpawn')
        this.P1 = new Biker(this,slimeSpawn.x+64, slimeSpawn.y,  'sprite1')

        this.foregroundImage = this.add.image(this.cameras.main.width /2, this.cameras.main.height-144, 'overlayImage')
        this.foregroundImage.setDepth(2) // Set depth higher than other game objects
        // Scale the image to fit the camera
        this.foregroundImage.displayWidth = this.cameras.main.width
        this.foregroundImage.displayHeight = this.cameras.main.height
        this.foregroundImage.scaleX = 0.61


        this.cameras.main.setBounds(0,80,map.widthInPixels, 224)
        this.cameras.main.startFollow(this.P1 , true, 0.1, 0.1)

        this.sky.setScrollFactor(0)
        this.statUI.setScrollFactor(0)
        this.foregroundImage.setScrollFactor(0)
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.P1, bgLayer)
    }

    update() {
        //this.sky.tilePositionX += 10
        this.cameras.main.scrollX += 1
        this.cameras.main.scrollY += 1
        this.points++
        this.P1.update()
        if(Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(FKey)))
        {
            if (this.foregroundImage.active) {
                this.foregroundImage.destroy(); // Remove the image from the scene
            }
            else{
                this.foregroundImage = this.add.image(this.cameras.main.width /2, this.cameras.main.height-144, 'overlayImage')
                this.foregroundImage.setDepth(2) // Set depth higher than other game objects

                // Scale the image to fit the camera
                this.foregroundImage.displayWidth = this.cameras.main.width
                this.foregroundImage.displayHeight = this.cameras.main.height
                this.foregroundImage.scaleX = 0.62
                        
                this.foregroundImage.setScrollFactor(0)
            }
            
        }

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) {
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
    }
}