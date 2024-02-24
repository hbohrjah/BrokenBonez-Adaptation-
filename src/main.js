// Code Practice: Slime World
// Name: 
// Date: 

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 1024/2,
    height: 576/2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [ Load, Overworld ]
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