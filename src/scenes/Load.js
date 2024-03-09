class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0x009900, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });

        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.bitmapFont('regularShow', 'fonts/Unnamed.png','fonts/Unnamed.xml')
        this.load.image('sky', 'img/bb-Bckg.png')

        this.load.image('tilesetImage', 'img/bbTrack-Sheet.png')
        this.load.image('overlayImage', 'img/overlay.png')
        this.load.tilemapTiledJSON('track1JSON', 'img/bb-Track1.json')
        // load spritesheet
        this.load.spritesheet('sprite1', 'img/brokenBonez-hero-Sheet.png', 
        {
            frameWidth: 137,
            frameHeight: 116
        })
        this.load.spritesheet('statUI', 'img/bb-UI.png', 
        {
            frameWidth: 496,
            frameHeight: 57
        })
        this.map = this.make.tilemap('track1JSON')

        //this.load.audio('sfx-pop', 'sfx/pop.wav')
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
        this.anims.create({
            key: 'drive',
            frames: this.anims.generateFrameNumbers('sprite1', { start: 1, end: 2}),
            frameRate: 5,
            repeat : 0
        })
        this.anims.create({
            key: 'stats',
            frames: this.anims.generateFrameNumbers('statUI', { start: 0, end: 5}),
            frameRate: 5,
            repeat : 0
        })
        // go to Title scene
        this.scene.start('overworldScene');
    }
}

