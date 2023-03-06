import { CheckCollision } from "./helpers/check-collision";
import { Ball } from "./components/ball";
import { ElasticCollision } from "./helpers/elastic-collision";
import { ChangingColor } from "./components/changing-color.js";

/** @type {HTMLCanvasElement} **/

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

class Environment {
  constructor(ballMouse) {
    this.ballMouse = ballMouse;
    this.canvasWidth = canvas2.width;
    this.canvasHeight = canvas2.height;
    this.numberOfBalls = 80;
    this.balls = [];
    this.addBalls();
  }
  addBalls() {
    for (let i = 0; i < this.numberOfBalls; i++) {
      this.balls.push(new Ball(ctx2, this));
      if (i !== 0) {
        for (let j = 0; j < this.balls.length - 1; j++) {
          const [isCollision] = CheckCollision.checkCollisionForCircles(
            this.balls[j],
            this.balls[i]
          );
          if (isCollision) {
            this.balls.splice(i, 1, new Ball(ctx2, this));
            j = -1;
          }
        }
      }
    }
  }
  update() {
    this.balls.forEach((ball) => {
      ball.update();
      const [isCollision] = CheckCollision.checkCollisionForCircles(
        this.ballMouse,
        ball
      );
      if (isCollision) {
        ball.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`;
      }
    });
  }
}

const changeColor = new ChangingColor(ctx2);
let environment = new Environment(changeColor);

window.addEventListener("resize", (e) => {
  canvas2.width = e.target.innerWidth;
  canvas2.height = e.target.innerHeight;
  environment = new Environment(changeColor);
});

function animate() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  environment.update();
  requestAnimationFrame(animate);
  changeColor.draw();
}

animate(0);
