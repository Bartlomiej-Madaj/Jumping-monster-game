import { Background } from "./components/background.js";
import { Controller } from "./helpers/controller.js";
import { Player } from "./components/player.js";
import { Egg } from './components/egg.js'
import { Enemy } from "./components/enemy.js";
import { Obstacle } from "./components/obstacle.js";
import { Bug } from "./components/bug.js";
import { EndCredits } from "./components/end-credits.js";
import { ScoreBoard } from "./components/score-board.js";

import './styles/style.css'

/**  @type {HTMLCanvasElement}  */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = 500;

class Game {
  constructor() {
    this.eggs = [];
    this.enemies = []
    this.numberOfEnemies = 1;
    this.bottomBoundary = canvas.height - 100;
    this.player = new Player(this, ctx, canvas.width, canvas.height );
    this.controller = new Controller(this);
    this.enemy = new Enemy(ctx, canvas.width, canvas.height)
    this.numberOfEggs = 1;
    this.numberOfObstacles = 1;
    this.positionX = 0;
    this.positionY = 0;
    this.imageWidth = 2592;
    this.imageHeight = 500;
    this.bugs = [];
    this.obstacles = [];
    this.obstacleInterval = 2000;
    this.obctacleTimer = 0;
    this.eggTimer = 0;
    this.randomInterval = Math.random() * 1000 + 500;
    this.gameOver = false;
    window.addEventListener("resize", e => {
      canvas.width = e.target.innerWidth * 0.8
      this.player = new Player(this, ctx, canvas.width, canvas.height );
    })
    this.smallScreen = 1000;
    this.init()
  }

  update(deltaTime) {
    !this.gameOver && this.enemies.forEach((enemy, index) => {
      enemy.update()
      if(this.enemies[0].positionX < canvas.width * 0.2 && canvas.width > this.smallScreen && this.enemies.length < 2){
      this.addEnemy()
      }
      if(enemy.positionX < - 2 * enemy.radious){
        this.removeEnemy(index)
        canvas.width < this.smallScreen && this.addEnemy()
      }
    })
    if (this.eggs.length < this.numberOfEggs && this.eggTimer % 50 === 0) {
      this.addEggs();
      this.eggTimer = 0;
    } else {
      this.eggTimer++;
    }
    if (
      this.obctacleTimer > this.obstacleInterval + this.randomInterval &&
      !this.gameOver
    ) {
      this.addObstacle();
      this.obctacleTimer = 0;
    } else {
      this.obctacleTimer += deltaTime;
    }
    !this.gameOver && this.obstacles.forEach((obstacle, index) => {
      if (obstacle.positionX < - obstacle.imageWidth) {
        this.obstacles = this.obstacles.filter((obstacle, id) => id !== index);
      }
      obstacle.draw();
      !this.gameOver && obstacle.update();
    });
    this.bugs.forEach((bug, index) => {
      bug.update();
      if (bug.positionY < 0 - bug.radious) {
        this.bugs = this.bugs.filter((bug, id) => index !== id);
      }
    });
    this.player.update();
    this.eggs.forEach((egg) => !this.gameOver && egg.update());
    ScoreBoard.render(ctx);
    this.gameOver && EndCredits.render(ctx, canvas.width, canvas.height);
    this.gameOver && this.clearGame()
    this.controller.restart();
  }
  addEnemy(){
      this.enemies.push(new Enemy(ctx, canvas.width, canvas.height));
  }
  removeEnemy(index){
    this.enemies = this.enemies.filter((enemy, id) => id !== index);
  }
  addEggs() {
    for (let i = 0; i < this.numberOfEggs; i++) {
      this.eggs.push(new Egg(ctx, canvas.width, canvas.height));
    }
  }
  addObstacle() {
    this.obstacles.push(new Obstacle(ctx, canvas.width, canvas.height));
  }
  addBug(positionX, positionY) {
    this.bugs.push(new Bug(positionX, positionY, ctx));
  }
  clearGame(){
    this.obstacles = []
    this.eggs = []
    this.enemies = []
  }
  init() {
    this.addEnemy()
    this.controller.move();
  }
}

const background = new Background(ctx);
const game = new Game();
let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  Controller.isStart && game.update(deltaTime);
  requestAnimationFrame(animate);
}
Controller.startGame()
animate(0);


