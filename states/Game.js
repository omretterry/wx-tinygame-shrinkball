window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class Game extends window.Phaser.State {
  brickWidth = 300;
  interval = 65;

  init(colorball){
    this.colorball = colorball;
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.ball = this.add.sprite(this.world.centerX, this.world.height - 100, this.colorball)
    this.ball.anchor.setTo(0.5)

    this.bricks = this.add.group();
    this.time.events.loop(1500,this.genBrickRow,this);
  }

  update() {
    if (this.ball.width <= 5 || this.ball.height <= 5) {
      this.state.start('GameOver');
    }

    if (this.input.activePointer.isDown) {
      this.ball.width += 5;
      this.ball.height += 5;
    }
    else {
      if (this.ball.width > 5 || this.ball.height > 5) {
        this.ball.width -= 1.5;
        this.ball.height -= 1.5;
      }
    }
  }


  genBrickRow(){
    let randomWidth = Math.floor(Math.random() * (2 * this.interval));
    console.log(randomWidth);
    let breakWidth = this.interval + randomWidth;
    this.genBrick(this.world.centerX - this.brickWidth/2 - breakWidth/2, 0);
    this.genBrick(this.world.centerX + this.brickWidth/2 + breakWidth/2, 0);
  }

  genBrick(x, y) {
    let brick = this.add.sprite(x, y, 'brick');
    brick.width = 300;
    brick.height = 40;
    this.physics.arcade.enable(brick);
    brick.body.velocity.y = 100;
    brick.anchor = new Phaser.Point(0.5, 0.5);

    this.bricks.add(brick);
    brick.checkWorldBounds = true;
    brick.outOfBoundsKill = true;
  }
}

export default Game
