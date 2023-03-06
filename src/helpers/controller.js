import { ScoreBoard } from "../components/score-board";

export class Controller {
  constructor(game) {
    this.game = game;
  }
  move() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w": {
          if (!this.game.player.isKeyPressed.w) {
            this.game.player.dy = -20;
            this.game.player.isKeyPressed.w = true;
          }
          break;
        }
        case "d": {
          this.game.player.isKeyPressed.d = true;
          this.game.player.lastPressedKey = "d";
          this.game.player.dx = 5;
          break;
        }
        case "a": {
          this.game.player.isKeyPressed.a = true;
          this.game.player.lastPressedKey = "a";
          this.game.player.dx = -10;
          break;
        }
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "d": {
          this.game.player.isKeyPressed.d = false;
          break;
        }
        case "a": {
          this.game.player.isKeyPressed.a = false;
          break;
        }
      }
    });
  }
  restart() {
    if (this.game.gameOver) {
      window.addEventListener("keydown", this.restartHandler);
    } else {
      window.removeEventListener("keydown", this.restartHandler);
    }
  }
  restartHandler = (e) => {
    if (e.key === "r") {
      this.game.player.restart();
      this.game.gameOver = false;
      this.game.bugs = [];
      this.game.init();
      ScoreBoard.resetCounter();
    }
  };
  static isDebug = false;
  static debug() {
    if (!this.isDebug) {
      window.addEventListener("keydown", this.debugHandler);
    }
    return this;
  }
  static debugHandler = (e) => {
    if (e.key === "z") {
      this.isDebug = !this.isDebug;
    }
  };
}
