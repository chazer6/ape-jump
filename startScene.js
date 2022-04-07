
export default class startScene extends Phaser.Scene {
    constructor(){
        super('startScene')
    }

    
    preload(){
        this.load.image('snub','resources/snub nose-1.png')

    }

    create(){
        this.add.sprite(400,170,'snub').setScale(0.4);
        /* local host locations
        this.add.text(400, 100, 'Ape Jump', { fontSize: '40px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 300, 'Platform to reach the coin,', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 335, 'try to get the best time!', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 400, 'Direction keys to move,', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 435, 'space to jump. Dont get hit!', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 495, "F to restart if you're bad.", { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);

        this.add.text(400, 550, 'Press ENTER to start!', { fontSize: '35px', fill: '#000' }).setOrigin(0.5,0.5);
        */
        this.add.text(400, 0, 'Ape Jump', { fontSize: '40px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 220, 'Platform to reach the coin,', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 255, 'try to get the best time!', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 320, 'Direction keys to move,', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 355, 'space to jump. Dont get hit!', { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);
        this.add.text(400, 415, "F to restart if you're bad.", { fontSize: '25px', fill: '#000' }).setOrigin(0.5,0.5);

        this.add.text(400, 470, 'Press ENTER to start!', { fontSize: '35px', fill: '#000' }).setOrigin(0.5,0.5);

        

    }

    update(){
        let enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        if(enter.isDown){
            
            this.scene.start('gameScene');
        }
    }

}
