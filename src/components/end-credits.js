import { ScoreBoard } from "./score-board";

export class EndCredits {
  static render(ctx, canvasWidth, canvasHeight) {
    let message1;
    let message2;
    if (ScoreBoard.score < 10) {
      message1 = "You have to train more";
      message2 = `Your score: ${ScoreBoard.score}`;
    }
    if (ScoreBoard.score >= 10 && ScoreBoard.score < 30) {
      message1 = "Good Job!!";
      message2 = `Your score: ${ScoreBoard.score}`;
    } else if (ScoreBoard.score >= 30) {
      message1 = "You are MONSTER!!!";
      message2 = `Your score: ${ScoreBoard.score}`;
    }
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "50px Bangers";
    ctx.fillText(message1, canvasWidth / 2, canvasHeight / 2);
    ctx.fillText(message2, canvasWidth / 2, canvasHeight / 2 + 50);
    ctx.restore();
    ctx.save();
    ctx.font = "30px Bangers";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      'If you want try again press "R"',
      canvasWidth / 2,
      canvasHeight / 2 + 100
    );
    ctx.restore();
  }
}
