import BugImage from "../../public/images/bug/bug.png";
import { Controller } from "../helpers/controller";

export class Bug {
  constructor(positionX, positionY, context) {
    this.ctx = context;
    this.positionX = positionX;
    this.positionY = positionY;
    this.radious = 20;
    this.image = new Image();
    this.image.src = BugImage;
    this.scale = 0.6;
    this.spriteWidth = 150;
    this.spriteHeight = 150;
    this.imageWidth = this.spriteWidth * this.scale;
    this.imageHeight = this.spriteHeight * this.scale;
    this.angle = 0;
    this.dy = 1;
    this.dx = 3;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.positionX - this.imageWidth / 2,
      this.positionY - this.imageHeight + this.radious,
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
    this.positionY -= this.dy;
    this.positionX += Math.cos(this.angle) * this.dx;
    this.angle += 0.2;
  }
}
