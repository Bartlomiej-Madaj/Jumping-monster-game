export class ChangingColor {
    constructor(context) {
      this.ctx = context
      this.positionX;
      this.positionY;
      this.radious = 60;
      window.addEventListener("mousemove", this.assignPosition);
    }
    draw() {
      this.ctx.save();
      this.ctx.globalAlpha = 1;
      this.ctx.beginPath();
      this.ctx.arc(this.positionX, this.positionY, this.radious, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.restore();
    }
    assignPosition = (e) => {
      this.positionX = e.clientX;
      this.positionY = e.clientY;
    };
  }