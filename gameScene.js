
let player
let platforms
let turrets
let bullets
let goal
let timeText
let boardText
let cursors
let FKey
let horizontal


import gameState from './config.js';



export default class gameScene extends Phaser.Scene {
    constructor(){
        super('gameScene')
    }


    preload ()
    {
        this.load.image('snub','resources/snub nose-1.png')
        this.load.image('background','resources/AoA background.png')
        this.load.image('platform','resources/platforms.png')
        this.load.image('turret','resources/turret.png')
        this.load.image('bullet','resources/bullet.png')
        this.load.image('goal','resources/goal.png')
        this.load.image('spike','resources/spike.png')
        this.load.image('blood','resources/blood.png')
        


    }

    create ()
    {
        

        this.add.image(0,0,'background').setOrigin(0,0);
        player = this.physics.add.sprite(750,500,'snub').setScale(0.1);
        platforms = this.physics.add.staticGroup();
        platforms.create(0,590,'platform').setOrigin(0,0).refreshBody();
        platforms.create(30,520,'platform').setScale(0.2,0.1).refreshBody();
        platforms.create(700,400,'platform').setScale(0.1).refreshBody();
        platforms.create(770,325,'platform').setScale(0.1).refreshBody();
        
        let spike = this.physics.add.sprite(400,295,'spike').setScale(1,1.5);
        spike.body.setAllowGravity(false);
        spike.setImmovable(true);

        platforms.create(400,295,'platform').setScale(0.4,0.1).refreshBody();
        platforms.create(100,220,'platform').setScale(0.1).refreshBody();
        platforms.create(300,150,'platform').setScale(0.05,0.1).refreshBody();
        platforms.create(500,150,'platform').setScale(0.05,0.1).refreshBody();

        

        horizontal = this.physics.add.sprite(250,460,'platform').setScale(0.1);
        horizontal.setImmovable(true);
        horizontal.body.setAllowGravity(false);
        horizontal.setVelocityX(60);

        this.physics.add.collider(player,horizontal)

        platforms.create(750,110,'platform').setScale(0.1).refreshBody();
        turrets = this.physics.add.staticGroup();
        turrets.create(200,0,'turret').setScale(0.6);
        turrets.create(600,0,'turret').setScale(0.6);
        
        this.physics.add.collider(player,platforms)
        player.setCollideWorldBounds(true);

        goal = this.physics.add.sprite(750,90,'goal')

        goal.body.setAllowGravity(false);

        this.physics.add.overlap(player,goal,this.win,null,this);


        timeText = this.add.text(400, 0, 'Time taken: 0', { fontSize: '18px', fill: '#000' }).setOrigin(0.5);
        if(gameState.highScore === 0){
            boardText = this.add.text(400, 20, 'Your best: None', { fontSize: '18px', fill: '#000' }).setOrigin(0.5);
        } else {
            boardText = this.add.text(400, 20, 'Your best: ' + gameState.highScore, { fontSize: '18px', fill: '#000' }).setOrigin(0.5);
        }

        let devTime = this.add.text(400, 40, 'Dev best: 13.3', { fontSize: '18px', fill: '#000' }).setOrigin(0.5);


        bullets = this.physics.add.group();

        let genBullet = () => {
            let totalTurrets = turrets.getChildren();
            for(let i=0;i<totalTurrets.length;i++)
                bullets.create(totalTurrets[i].x-9,totalTurrets[i].y+20,'bullet').setScale(0.3).setGravity(0,-400).setVelocityY(400);       
        }

        let bulletEvent = this.time.addEvent(
            {
        delay: 1000,
        callback: genBullet,
        callbackScope: this,
        loop: true,
            }
        );
        
        this.physics.add.collider(bullets,platforms,(bullet)=>{
            bullet.destroy();
        });
        
    
        this.physics.add.collider(bullets,player,(player,bullet)=>{
            bloodSplash.setPosition(player.x, player.y).start();
            player.visible = false;

            this.time.delayedCall(700, ()=>{
                bloodSplash.stop();
                player.setX(750);
                player.setY(500);
                player.setVelocityX(0);
                player.setVelocityY(0);
                player.visible = true;
            });   
            bullet.destroy();
        });

        let particles = this.add.particles('blood')
        let bloodSplash = particles.createEmitter({
            on:false,
            lifespan: 700,
            speed: 100,
            scale: 0.3
        });

        this.physics.add.collider(player,spike,()=>{
            bloodSplash.setPosition(player.x, player.y).start();
            player.visible = false;

            this.time.delayedCall(700, ()=>{
                bloodSplash.stop();
                player.setX(750);
                player.setY(500);
                player.setVelocityX(0);
                player.setVelocityY(0);
                player.visible = true;
            });

        },null,this);

        let addTime = () => {
            gameState.gameRuntime +=0.1
        }

        let timerEvents = this.time.addEvent({
            delay: 100,                // ms
            callback: addTime,
            callbackScope: this,
            loop: true
        });
        cursors = this.input.keyboard.createCursorKeys();

        FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);    
    }


    update ()
    { 
        if (cursors.left.isDown){
            player.setVelocityX(-300);
            player.angle -=9
        }
        else if (cursors.right.isDown){
            player.setVelocityX(300);
            player.angle += 9
        } else {
            player.setVelocityX(0);
        }
        
        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-290);
        }

        if(FKey.isDown){
            this.scene.stop('gameScene');
            gameState.gameRuntime = 0;
            this.scene.start('gameScene');
        }

        //horizontal.refreshBody();
        if (horizontal.x >= 500)
        {
            horizontal.setVelocityX(-60);
        }
        else if (horizontal.x <= 300)
        {
            horizontal.setVelocityX(60);
        }
        
        //gameState.gameRuntime = gameState.time * 0.001; //Converted to Seconds
        timeText.setText("Time taken: " + Math.round(gameState.gameRuntime*10)/10);
        

    }  

    win (player,goal)
    { 
        player.setTint(0xff0000);
        goal.disableBody(true,true);
        this.physics.pause();
        
        this.scene.pause();
        if(gameState.highScore === 0){
            gameState.highScore = Math.round(gameState.gameRuntime*10) / 10;
            boardText.setText("Best time: " + gameState.highScore);

        } else if(Math.round(gameState.gameRuntime)< gameState.highScore){
            gameState.highScore = Math.round(gameState.gameRuntime*10)/10;
            boardText.setText("Best time: " + gameState.highScore);
        }
        this.scene.stop('gameScene');
        this.scene.start('endScene');
    }
}