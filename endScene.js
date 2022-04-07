
import gameState from './config.js';


export default class endtScene extends Phaser.Scene {
    constructor(){
        super('endScene')
    }

    preload(){
        this.load.image('snub','resources/snub nose-1.png')

    }

    create(){
        this.add.sprite(400,150,'snub').setScale(0.6);
        
        this.add.text(400, 430, 'Press ENTER to replay', { fontSize: '35px', fill: '#000' }).setOrigin(0.5,0.5);

        this.add.text(400, 220, 'Congrats, you WON!', { fontSize: '50px', fill: '#000' }).setOrigin(0.5,0.5);


        this.add.text(400,320,'Time: ' + Math.round(gameState.gameRuntime*10)/10,{ fontSize: '50px', fill: '#000' }).setOrigin(0.5,0.5);

        this.add.text(400,360,'Best Time: ' + gameState.highScore,{ fontSize: '50px', fill: '#000' }).setOrigin(0.5,0.5);

    }

    update(){
        let enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if(enter.isDown){
            this.scene.start('gameScene');
            gameState.gameRuntime = 0;
            
        }
    }

}