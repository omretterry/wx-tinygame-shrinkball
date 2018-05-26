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
    this.load.image('blueball', 'images/blueball.png')
    this.load.image('greenball', 'images/greenball.png')
    this.load.image('redball', 'images/redball.png')
    this.load.image('yellowball', 'images/yellowball.png')
    this.load.image('brick', 'images/brick.png')
    this.load.image('restart', 'images/restart.png')
  }

  create() {
    this.gametitle = this.add.text(this.world.centerX, this.world.centerY - 120, 'Shrink Ball', {
      font: 'Arial',
      fill: '#fff',
      fontWeight: 'bold',
      fontSize: 30
    })

    this.add.text(12, this.world.height - 50, 'omret.com\nV1.0.0', {
      font: 'Arial',
      fill: '#fff',
      fontWeight: 'bold',
      fontSize: 12
    })

    this.gametitle.anchor.setTo(0.5)
    this.colorBall = this._getRandomColorBall();
    this.startCircle = this.add.sprite(this.world.centerX, this.world.height - 200, this.colorBall);

    this.startCircle.anchor = new Phaser.Point(0.5, 0.5);
    this.startCircle.width = 100;
    this.startCircle.height = 100;
    
    this.add.tween(this.startCircle).to({width:150,height:150},1000,'Linear').yoyo(true).repeat(-1).start();

    this.startCircle.inputEnabled = true;
    this.startCircle.events.onInputDown.add(function () {
      this.state.start('Game', true, false, this.colorBall);
    }, this)
  }

  render() {

  }

  _getRandomColorBall(){
    let colorBall = ['redball','yellowball','blueball','greenball'];
    let index = Math.floor(Math.random()*4);
    console.log(colorBall[index]);
    return colorBall[index];
  }
}

export default Start
