import ObstacleImage1 from "../../public/images/obstacles/fern1.png";
import ObstacleImage2 from "../../public/images/obstacles/mushroom_spotted_1.png";
import ObstacleImage3 from "../../public/images/obstacles/mushroom_spotted_3.png";
import ObstacleImage4 from "../../public/images/obstacles/mushroom_spotted_5.png";
import ObstacleImage5 from "../../public/images/obstacles/orange_mushroom.png";
import ObstacleImage6 from "../../public/images/obstacles/slimy_mushroom.png";
import { Controller } from "../helpers/controller";

export class Obstacle {
  constructor(context, canvasWidth, canvasHeight) {
    this.ctx = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 70;
    this.height = 140;
    this.margin = 100;
    this.positionX = this.canvasWidth;
    this.positionY = this.canvasHeight - this.margin - this.height;
    this.speed = 5;
    this.obsticleImageSource = [
      ObstacleImage1,
      ObstacleImage2,
      ObstacleImage3,
      ObstacleImage4,
      ObstacleImage5,
      ObstacleImage6,
    ];
    this.image = new Image();
    this.image.src =
      this.obsticleImageSource[
        Math.floor(Math.random() * this.obsticleImageSource.length)
      ];
    this.imageWidth = 100;
    this.imageHeight = 140;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.positionX,
      this.positionY,
      this.imageWidth,
      this.imageHeight
    );
    if (Controller.debug().isDebug) {
      this.ctx.save();
      this.ctx.fillStyle = "white";
      this.ctx.strokeStyle = "black";
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillRect(
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
      this.ctx.restore();
    }
  }
  update() {
    this.draw();
    this.positionX -= this.speed;
  }
}
