window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class GameOver extends window.Phaser.State {
  create() {
    console.log("gameover state");
    this.gameover = this.add.text(this.world.centerX, this.world.centerY - 120, 'Game Over', {
        font: 'Arial',
        fill: '#fff',
        fontSize: 30
    })
    this.gameover.anchor.setTo(0.5)
  }

  update() {

  }
}

export default GameOver
