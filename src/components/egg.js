import EggImage from "../../public/images/egg/Egg.png";
import { Controller } from "../helpers/controller";

export class Egg {
  constructor(context, canvasWidth, canvasHeight) {
    this.ctx = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radious = 30;
    this.minHeight = 50;
    this.maxHeight = this.canvasHeight - 200;
    this.positionX =
      this.canvasWidth / 2 +
      Math.floor(Math.random() * (this.canvasWidth / 2 - this.radious));
    this.positionY =
      Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
    this.image = new Image();
    this.image.src = EggImage;
    this.scale = 0.8;
    this.imageWidth = 110 * this.scale;
    this.imageHeight = 135 * this.scale;
    this.dx = 1;
    this.dy = 1;
    this.angel = 0;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
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
    this.positionX += this.dx * Math.cos(this.angel) - 1;
    this.positionY += this.dy * Math.sin(this.angel);
    this.angel += 0.2;
  }
}
