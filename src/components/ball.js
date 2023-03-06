import { CheckCollision } from "../helpers/check-collision";
import { ElasticCollision } from "../helpers/elastic-collision";

export class Ball {
  constructor(context, environment) {
    this.environment = environment;
    this.ctx = context;
    this.canvasWidth = canvas2.width;
    this.canvasHeight = canvas2.height;
    this.minRadious = 10;
    this.maxRadious = 30;
    this.radious =
      Math.random() * (this.maxRadious - this.minRadious) + this.minRadious;
    this.positionX =
      Math.random() * (this.canvasWidth - 2 * this.radious) + this.radious;
    this.positionY =
      Math.random() * (this.canvasHeight - 2 * this.radious) + this.radious;
    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;

    this.velocity = {
      x: Math.random() * 3 - 2,
      y: Math.random() * 3 - 2,
    };
    this.mass = 10;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = 0.4;
    this.ctx.beginPath();
    this.ctx.arc(this.positionX, this.positionY, this.radious, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.restore();
    this.ctx.closePath();
  }
  update() {
    this.draw();
    for (let i = 0; i < this.environment.balls.length; i++) {
      if (this.environment.balls[i] === this) continue;
      const [isCollision] = CheckCollision.checkCollisionForCircles(
        this,
        this.environment.balls[i]
      );
      if (isCollision) {
        ElasticCollision.resolveCollision(this, this.environment.balls[i]);
      }
    }
    this.positionX += this.velocity.x;
    this.positionY += this.velocity.y;
    if (
      this.positionX > this.canvasWidth - this.radious ||
      this.positionX < this.radious
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      this.positionY > this.canvasHeight - this.radious ||
      this.positionY < this.radious
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }
}
