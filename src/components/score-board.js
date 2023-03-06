export class ScoreBoard {
    static score = 0;
    static count() {
      this.score++;
    }
    static resetCounter() {
      this.score = 0;
    }
    static render(ctx) {
      ctx.save();
      ctx.fillStyle = "white";
      ctx.font = "40px Bangers";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${this.score}`, 25, 50);
      ctx.restore();
    }
  }