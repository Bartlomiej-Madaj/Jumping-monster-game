import BackgroundImage from "../../public/images/background/background.jpg";

export class Background {
  constructor(context) {
    this.ctx = context;
    this.background = new Image();
    this.background.src = BackgroundImage;
    this.positionX = 0;
    this.positionY = 0;
    this.imageWidth = 2592;
    this.imageHeight = 500;
    this.speed = 5;
  }
  draw() {
    this.ctx.drawImage(
      this.background,
      this.positionX,
      this.positionY,
      this.imageWidth,
      this.imageHeight
    );
    this.ctx.drawImage(
      this.background,
      this.positionX + this.imageWidth - this.speed,
      this.positionY,
      this.imageWidth,
      this.imageHeight
    );
  }
  update() {
    this.draw()
    this.positionX -= this.speed;
    if (this.positionX < -this.imageWidth) this.positionX = 0;
  }
}
