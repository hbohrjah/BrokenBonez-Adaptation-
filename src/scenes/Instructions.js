class Help extends Phaser.Scene {
    constructor() {
        super('helpScene');
    }

    create() {
        let blinkInterval;
        

        // Use the custom font in a text object
        const text = this.add.bitmapText(game.config.width/2, game.config.height/2, 'pixelFont', 'Controls', 72).setOrigin(0.5);
        // Create a text object
        //text = this.add.text(100, 100, 'Blinking Text', { fontFamily: 'Arial', fontSize: '32px', color: '#ffffff' });

        // Set up a timer to toggle visibility every 500 milliseconds
        blinkInterval = this.time.addEvent({
            delay: 500,
            callback: toggleTextVisibility,
            callbackScope: this,
            loop: true
        });
        

        function toggleTextVisibility() {
            // Toggle visibility of the text object
            text.visible = !text.visible;
        }
        const sub = this.add.bitmapText(game.config.width/2, game.config.height/2 + 72,  'pixelFont', 'Press (D) to Accelerate', 72).setOrigin(0.5);
        const cred = this.add.bitmapText(game.config.width/2, game.config.height/2 + 112,  'pixelFont', 'Press (SPACE) for Jump', 72).setOrigin(0.5);
        const start = this.add.bitmapText(game.config.width/2, game.config.height/2 + 148,  'pixelFont', 'Press (Enter) to Start', 72).setOrigin(0.5);
        sub.setScale(0.5)
        cred.setScale(0.5)
        start.setScale(0.5)
    }

    update() {

        this.restart()
    }

    restart()
    {
        if (Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(RKey))) {
            // start next scene
            passed = 0
            
            this.scene.start('menuScene');

        }

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)))
        {
            this.scene.start('creditsScene');
        }

        this.input.keyboard.on('keydown', (event)=> {
            if (event.key === "Enter") {
                // Enter key was pressed, handle it here
                this.scene.start('loadScene')  
                console.log("Enter key pressed!");
            }
        })
        /*else if(Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(FKey)))
        {
            passed = 0
            this.scene.start('creditsScene');
        }*/
    }
}