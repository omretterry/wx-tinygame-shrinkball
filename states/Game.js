window.PIXI = require('../js/libs/pixi.min')
window.p2 = require('../js/libs/p2.min')
window.Phaser = require('../js/libs/phaser-split.min')

class Game extends window.Phaser.State {
  brickWidth = 300;
  interval = 55;

  score = 0;

  init(colorball){
    if(colorball){
      this.colorball = colorball;
    } else {
      let colorBall = ['redball','yellowball','blueball','greenball'];
      let index = Math.floor(Math.random()*4);
      this.colorball = colorBall[index];
    }
  }

  create() {
    this.score = 0;
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.ball = this.add.sprite(this.world.centerX, this.world.height - 50, this.colorball)
    this.ball.anchor.setTo(0.5)
    this.ball.width = 120;
    this.ball.height = 120;

    this.physics.arcade.enable(this.ball);

    this.scoreText = this.add.text(23, 23, "Score:" + this.score, {
      font: 'Arial',
      fill: this._getRandomColor(),
      fontWeight: 'bold',
      fontSize: 18
    })

    this.bricks = this.add.group();
    this.time.events.loop(1500,this.genBrickRow,this);


  }

  update() {
    if (this.ball.width <= 5 || this.ball.height <= 5) {
      this.state.start('GameOver',true,false,this.score);
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

    this.scoreText.setText('Score:' + this.score);
    this.scoreText.bringToTop();

    this.physics.arcade.collide(this.ball,this.bricks,this.bricksCollide,null,this);
  }

  bricksCollide(){
    this.state.start('GameOver',true,false,this.score);
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

    brick.events.onOutOfBounds.add(this.incScore, this);
  }

  incScore(){
    this.score = this.score + 0.5;
  }

  _getRandomColor(){
    let color = ['#0099cc','#ffcc33','#009966','#ff6666'];
    let index = Math.floor(Math.random()*4);
    return color[index];
  }
}

export default Game
