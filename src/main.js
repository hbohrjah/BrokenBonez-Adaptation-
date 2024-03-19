// Code Practice: Broken bonez (Adaptation)
// Name: Handrei Bohrjah
// Date: 3/5/2024

//Phaser Components
// 1. Physics- Used Matter.js physics
// 2. Cameras - The camera follows the racer as they move through the course
// 3. Text Object - Added custom pixel fonts, also added blinking animation
// 4. Animation Manager - Used a subtle animation for the biker when they are moving
// 5. Tilemap was used in the background
// * Centered the game windows borders using CSS/HTML

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1024,
    height: 576,
    physics: {
        default: "matter",
        matter: {
            debug: {
                staticLineColor: 0xff0000
            },
            gravity: {y : 1}
            
        }
    },
    zoom: 1.2,
    scene: [ Menu, Load, Overworld, GameOver, Win, Credits, Help ]
}

const game = new Phaser.Game(config)



// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let { width, height } = game.config
let w = game.config.width;
let h = game.config.height;
let passed = 0
let inc = false
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '32px',
    backgroundColor: '#00FF00',
    color: '#000000',
    align: 'right',
    
  }
let RKey, FKey, keyLEFT, keyLEFT2, keyRIGHT, keyRIGHT2
let highScore = 0
let borderUISize = game.config.height/10;
let borderPadding = borderUISize/3; 
let scaleX = 0.5
let  scaleY = 0.5
const paddleWidth = 32;
const paddleHeight = 190;