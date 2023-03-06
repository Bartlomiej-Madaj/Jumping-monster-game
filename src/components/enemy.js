import EnemyImage from "../../public/images/enemy/skeleton_left.png";
import { Controller } from "../helpers/controller";

export class Enemy {
  constructor(context, canvasWidth, canvasHeight) {
    this.ctx = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.positionX = this.canvasWidth;
    this.positionY = Math.random() * (120 - 50) + 50;
    this.radious = 35;
    this.image = new Image();
    this.image.src = EnemyImage;
    this.scale = 0.6;
    this.spriteWidth = 150;
    this.spriteHeight = 150;
    this.imageWidth = this.spriteWidth * this.scale;
    this.imageHeight = this.spriteHeight * this.scale;
    this.dx = 8;
    this.dy = 3;
    this.angel = 0;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.positionX - this.imageWidth / 2,
      this.positionY - this.imageHeight / 2,
      this.imageWidth,
      this.imageHeight
    );
    if (Controller.debug().isDebug) {
      this.ctx.save();
      this.ctx.fillStyle = "white";
      this.ctx.strokeStyle = "black";
      this.ctx.globalAlpha = 0.5;
      this.ctx.lineWidth = 5;
      this.ctx.beginPath();
      this.ctx.arc(
        this.positionX,
        this.positionY,
        this.radious,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  update() {
    this.draw();
    this.positionX -= this.dx;
    this.positionY += this.dy * Math.sin(this.angel) + 0.08;
    this.angel += 0.04;
  }
}
