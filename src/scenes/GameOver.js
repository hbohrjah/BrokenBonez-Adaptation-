class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        let blinkInterval;
        

        // Use the custom font in a text object
        const text = this.add.bitmapText(game.config.width/2, game.config.height/2, 'pixelFont', 'Game Over', 72).setOrigin(0.5);
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
        const sub = this.add.bitmapText(game.config.width/2, game.config.height/2 + 72,  'pixelFont', 'Press (R) to Restart', 72).setOrigin(0.5);
        const cred = this.add.bitmapText(game.config.width/2, game.config.height/2 + 112,  'pixelFont', 'Press (C) for Credits', 72).setOrigin(0.5);
        sub.setScale(0.5)
        cred.setScale(0.5)
    }

    update() {

        this.restart()
    }

    restart()
    {
        if (Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(RKey))) {
            // start next scene
            passed = 0
            
            this.scene.start('overworldScene');

        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)))
        {
            this.scene.start('creditsScene');
        }
        /*else if(Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(FKey)))
        {
            passed = 0
            this.scene.start('creditsScene');
        }*/
    }
}