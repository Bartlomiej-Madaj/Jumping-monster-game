import { Controller } from "../helpers/controller";
import { ScoreBoard } from "./score-board";
import { CheckCollision } from "../helpers/check-collision.js";

import PlayerLeftImage from "../../public/images/player/monsterLeft.png";
import PlayerRightImage from "../../public/images/player/monsterRight.png";

export class Player {
  constructor(game, context, canvasWidth, canvasHeight) {
    this.game = game;
    this.ctx = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.height = this.canvasHeight;
    this.width = this.canvasWidth;
    this.positionX = 200;
    this.positionY = 200;
    this.radious = 40;
    this.image = new Image();
    this.imageWidth = 150;
    this.imageHeight = 150;
    this.dx = 4;
    this.dy = 5;
    this.gravity = 0.8;
    this.isKeyPressed = {
      d: false,
      a: false,
      w: false,
    };
    this.lastPressedKey;
    this.angle = 0;
    this.curve;
    this.offset = 20;
  }
  draw() {
    if (this.lastPressedKey === "d") {
      this.image.src = PlayerRightImage;
    } else if (this.lastPressedKey === "a") {
      this.image.src = PlayerLeftImage;
    } else {
      this.image.src = PlayerRightImage;
    }

    this.ctx.drawImage(
      this.image,
      this.positionX - this.imageWidth / 2,
      this.positionY - this.imageHeight / 2,
      this.imageWidth,
      this.imageHeight
    );
    if (Controller.debug().isDebug) {
      this.ctx.save();
      this.ctx.strokeStyle = "black";
      this.ctx.fillStyle = "white";
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
    this.curve = Math.sin(this.angle) * 5;
    this.positionY += this.dy;
    if (this.positionY > this.game.bottomBoundary - this.radious + this.curve) {
      this.positionY = this.game.bottomBoundary - this.radious + this.curve;
      this.dy = 0;
      this.isKeyPressed.w = false;
    } else {
      this.dy += this.gravity;
    }
    if (this.positionX < this.radious - this.dx) {
      this.positionX = this.radious;
      this.dx = 0;
    }
    if (this.positionX > this.canvasWidth - this.radious - this.dx) {
      this.positionX = this.canvasWidth - this.radious;
      this.dx = 0;
    }
    if (this.isKeyPressed.d && this.lastPressedKey === "d") {
      this.positionX += this.dx;
    } else if (this.isKeyPressed.a && this.lastPressedKey === "a") {
      this.positionX += this.dx;
    }
    for (let i = 0; i < this.game.eggs.length; i++) {
      const [isCollision, distance, sumOfRadii, dx, dy] =
        CheckCollision.checkCollisionForCircles(this, this.game.eggs[i]);
      if (isCollision && !this.game.gameOver) {
        ScoreBoard.count(this.ctx);
        this.game.addBug(
          this.game.eggs[i].positionX,
          this.game.eggs[i].positionY
        );
        this.game.eggs.splice(i, 1);
      } else if (
        this.game.eggs[i].positionX <
        -this.game.eggs[i].radious - this.offset
      ) {
        this.game.eggs.splice(i, 1);
      }
    }

    for (let i = 0; i < this.game.enemies.length; i++) {
      const [isCollision, distance, sumOfRadii, dx, dy] =
        CheckCollision.checkCollisionForCircles(this, this.game.enemies[i]);
      if (isCollision) {
        this.game.gameOver = true;
      }
    }

    for (let i = 0; i < this.game.obstacles.length; i++) {
      const [
        isLeftCollision,
        isTopCollision,
        isRightCollision,
        leftDistance,
        rightDistance,
        topDistance,
      ] = CheckCollision.checkCollisionForRectangle(
        this,
        this.game.obstacles[i]
      );
      if (isLeftCollision && isTopCollision && isRightCollision) {
        this.game.obstacles[i].positionX - this.positionX > 0
          ? (this.positionX = leftDistance)
          : (this.positionX = rightDistance);
        this.game.gameOver = true;
      }
    }
    this.angle += 0.15;
  }
  restart() {
    this.positionX = 200;
    this.positionY = 200;
  }
}
