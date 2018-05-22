window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class Start extends window.Phaser.State {
  init() {
    this.stage.backgroundColor = '#000'
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    //this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
  }

  preload() {
    this.load.image('blueball', 'images/blue-ball.png')
    this.load.image('brick', 'images/brick.jpg')
  }

  create() {
    this.gametitle = this.add.text(this.world.centerX, this.world.centerY - 120, 'Shrink Ball', {
      font: 'Arial',
      fill: '#fff',
      fontSize: 30
    })
    this.gametitle.anchor.setTo(0.5)
    this.startCircle = this.add.sprite(this.world.centerX, this.world.height - 120, 'blueball');

    this.startCircle.anchor = new Phaser.Point(0.5, 0.5);
    this.startCircle.width = 100;
    this.startCircle.height = 100;

    this.startCircle.inputEnabled = true;
    this.startCircle.events.onInputDown.add(function () {
      this.state.start('Game')
    }, this)
  }

  render() {

  }
}

export default Start
