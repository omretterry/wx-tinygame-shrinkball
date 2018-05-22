window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class Game extends window.Phaser.State {
  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.ball = this.add.sprite(this.world.centerX, this.world.height - 100, 'blueball')
    this.ball.anchor.setTo(0.5)

    this.bricks = this.add.group();
    this.genBrick();
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

  genBrick() {
    let brick = this.add.sprite(100, 0, 'brick');
    brick.width = 200;
    brick.height = 40;
    this.physics.arcade.enable(brick);
    brick.body.velocity.y = 100;

    this.bricks.add(brick);
    brick.checkWorldBounds = true;
    brick.outOfBoundsKill = true;
  }
}

export default Game
