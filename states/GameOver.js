window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class GameOver extends window.Phaser.State {
  init(score){
    this.score = score;
  }

  create() {
    console.log("gameover state");
    this.gameover = this.add.text(this.world.centerX, this.world.centerY - 120, 'Game Over', {
        font: 'Arial',
        fontWeight: 'bold',
        fill: '#fff',
        fontSize: 30
    })
    this.gameover.anchor.setTo(0.5)

    this.scoreText = this.add.text(this.world.centerX, this.world.centerY - 30, 'Score', {
      font: 'Arial',
      fill: this._getRandomColor(),
      fontSize: 25
    })
    this.scoreText.anchor.setTo(0.5)

    this.scoreText = this.add.text(this.world.centerX, this.world.centerY + 50, this.score, {
      font: 'Arial',
      fill: this._getRandomColor(),
      fontSize: 35
    })
    this.scoreText.anchor.setTo(0.5)

    this.restart = this.add.sprite(this.world.centerX, this.world.height - 120, 'restart');
    this.restart.scale.setTo(0.15);
    this.restart.anchor.setTo(0.5);

    this.restart.inputEnabled = true;
    this.restart.events.onInputDown.add(function () {
      this.state.start('Game');
    }, this)
  }

  update() {

  }

  _getRandomColor(){
    let color = ['#0099cc','#ffcc33','#009966','#ff6666'];
    let index = Math.floor(Math.random()*4);
    return color[index];
  }
}

export default GameOver
