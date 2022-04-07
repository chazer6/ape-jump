import startScene from './startScene.js'
import gameScene from './gameScene.js'
import endScene from './endScene.js'

let gameState = {
    time:0,
    gameRuntime:0,
    highScore:0
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '0x84CA0C',
    scene: [startScene,gameScene,endScene],
    physics: {
        default:'arcade',
        arcade: {
            gravity: { y: 400 },
            debug:false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
};

const game = new Phaser.Game(config);

export default gameState