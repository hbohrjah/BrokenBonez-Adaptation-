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
        this.sky = this.add.tileSprite(0, 0, 1024, 576, 'sky').setOrigin(0, 0)
        this.points = 0
        this.currentAnimationIndex = 0
    }

    create() {    
        //add tilemap from tiled
        this.map = this.add.tilemap('track1JSON')
        //import tileset image
        const tileset = this.map.addTilesetImage('bbTrack-Sheet', 'tilesetImage')
        //import the track layer from JSON
        const bgLayer = this.map.createLayer('Track', tileset, 0,0).setOrigin(0)
        //import Collision object layer from Tiled
        //var objectLayer = this.map.getObjectLayer('Collisions')
        //create a polygon from the vertices from the JSON
        //this is for the hill polygon
        const hill = 
        [
            new Phaser.Math.Vector2(658.333333333333,143.666666666667),
            new Phaser.Math.Vector2(1122,144),
            new Phaser.Math.Vector2(1009,-204),
            new Phaser.Math.Vector2(979,-205),
            new Phaser.Math.Vector2(659,1)
            
        ]
        //straightaway vertices polygon
        const straight1 = 
        [
            new Phaser.Math.Vector2(0,0),
            new Phaser.Math.Vector2(2,145),
            new Phaser.Math.Vector2(658.666666666667,143.666666666667),
            new Phaser.Math.Vector2(659,1)
       
        ]

        const straight2 = 
        [ 
            new Phaser.Math.Vector2(0,0),
            new Phaser.Math.Vector2(2.66666666666674,-130.666666666667),
            new Phaser.Math.Vector2(689.333333333333,-130.666666666667),
            new Phaser.Math.Vector2(689.333333333333,0)
        ]
        // create a polygon body that can be collided with
        //this represents the hill collisions
        
        //this represents the straightaway collisions
        this.straight1Vs = this.matter.add.fromVertices(324, 408, straight1, { isStatic: true })
        this.straight2Vs = this.matter.add.fromVertices(1575, 415, straight2, { isStatic: true })
        this.polygonBody = this.matter.add.fromVertices(888, 348, hill, { isStatic: true })
        
        // Don't forget: Collision bodies are added to world at the end of the function
        
        // add Biker
        const spawn = this.map.findObject('Spawns', (obj) => obj.name === 'bikerSpawn')
        //sets the collider shape for the player
        this.characterBody = this.matter.add.circle(spawn.x, spawn.y, 56, { isStatic: false });
        this.P1 = new Biker(this,spawn.x, spawn.y,  'sprite1', 1)
        this.P1.x = bgLayer.x + 64

        this.isColliding = this.P1 && this.P1.body && this.P1.body.collision

        console.log(this.isColliding)
        

        this.matter.world.setBounds(bgLayer.x,-256, this.map.widthInPixels, this.map.heightInPixels+256, 5,true,true,false,false)
        this.matter.world.convertTilemapLayer(bgLayer)

        this.cameras.main.setBounds(0,-620,this.map.widthInPixels, 1000)

        this.cameras.main.startFollow(this.P1 , true)
        this.cameras.main.setZoom(2)

        this.statUI = this.add.image(this.P1.x+450, this.P1.y-135, 'statUI', 0)
        this.statUI.setScale(1.1,1)
        this.statUI.rotation = Phaser.Math.DegToRad(-0.5)

        this.statUI.setScrollFactor(0)
        this.sky.setScrollFactor(0)
        // add the hill collisions to the world, rendered by matter.js
        //this.matter.world.add(this.polygonBody)
        // represents straightaway
        this.matter.world.add(this.characterBody);
    
    }

    update(time) {
        //this.sky.tilePositionX += 10
        this.cameras.main.scrollX += 1
        this.cameras.main.scrollY += 1
        this.points++
        this.P1.update(time)
        

        /*if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) {
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
        }*/
    }
}