// Graphical Overlay Abstraction
class Overlay extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture)
    {
        //How to make Matter physics sprite abstraction
        //https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220
        super(scene.matter.world, x, y, texture)
        //scene.add.existing(scene)
        //scene.setTexture(texture)
        //scene.parentScene = scene;
        
        scene.foregroundImage = scene.add.image(scene.cameras.main.width /2, scene.cameras.main.height/2, 'overlayImage')
        //scene.foregroundImage.setScale(1.5,3)
        scene.foregroundImage.setDepth(2) // Set depth higher than other game objects
        // Scale the image to fit the camera
        scene.foregroundImage.displayWidth = scene.cameras.main.width
        scene.foregroundImage.displayHeight = scene.cameras.main.height
        scene.foregroundImage.scaleX = 1

        //creates the stats UI bar without the updated values (overlay)
        scene.statUI = scene.add.image(scene.cameras.main.width /2, scene.cameras.main.height/2-200, 'statUI', 0)
        scene.statUI.setScale(2,2)
        scene.statUI.rotation = Phaser.Math.DegToRad(-0.5)


        
        scene.statUI.setScrollFactor(0)
        scene.foregroundImage.setScrollFactor(0)
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown( scene.input.keyboard.addKey(FKey)))
        {
            if (scene.foregroundImage.active) {
                scene.foregroundImage.destroy(); // Remove the image from the scene
                scene.statUI.destroy(); // Remove the image from the scene
            }
            else{
                scene.foregroundImage = scene.add.image(scene.cameras.main.width /2, scene.cameras.main.height-144, 'overlayImage')
                scene.foregroundImage.setDepth(2) // Set depth higher than other game objects

                // Scale the image to fit the camera
                scene.foregroundImage.displayWidth = scene.cameras.main.width
                scene.foregroundImage.displayHeight = scene.cameras.main.height
                scene.foregroundImage.scaleX = 0.62
                        
                scene.foregroundImage.setScrollFactor(0)
            }
            
        }
    }

}