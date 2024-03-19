// Code obtained from CMPM 120 'Rocket Patrol Tutorial'

class Menu extends Phaser.Scene
{
    constructor()
    {
        super('menuScene')
    }

    preload() {

      console.log("menu")
      this.load.path = './assets/'
      this.load.image('menu', 'img/menu.png')
      this.load.bitmapFont('pixelFont', 'fonts/pixel.png','fonts/pixel.xml')
      
      this.load.audio('sfx-enter', 'sfx/enterfx.wav')

      // Attach a load complete event listener
      this.load.on('complete', function () {
        if (this.textures.exists('menu')) {
            console.log('Image loaded successfully.');
        } else {
            console.error('Image failed to load.');
        }
      }, this)

    }

    create()
    {
      this.add.image(0, 0, 'menu').setOrigin(0, 0)
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      document.getElementById('info').innerHTML = '<strong>Broken Bonez Says,"</strong> Press H in the Menu to see controls"'
      this.startup = this.sound.add('sfx-enter')
      this.startup .setVolume(0.5)
    }

    update() 
    {

      this.input.keyboard.on('keydown', (event)=> {
        if (event.key === "Enter") {
            // Enter key was pressed, handle it here
            this.startup.play()
            this.scene.start('loadScene')
            
            
             
            console.log("Enter key pressed!");
        }
      })

      if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)))
      {
          this.scene.start('helpScene');
      }
    }
} 