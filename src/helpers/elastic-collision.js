export class ElasticCollision {
  static rotate(velocity, angle) {
    const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };
    return rotatedVelocities;
  }
  static resolveCollision(ball, otherBall) {
    const xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
    const yVelocityDiff = ball.velocity.y - otherBall.velocity.y;
    const xDist = otherBall.positionX - ball.positionX;
    const yDist = otherBall.positionY - ball.positionY;
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(
        otherBall.positionY - ball.positionY,
        otherBall.positionX - ball.positionX
      );
      const m1 = ball.mass;
      const m2 = otherBall.mass;
      const u1 = this.rotate(ball.velocity, angle);
      const u2 = this.rotate(otherBall.velocity, angle);
      const v1 = {
        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
        y: u2.y,
      };
      const vFinal1 = this.rotate(v1, -angle);
      const vFinal2 = this.rotate(v2, -angle);

      ball.velocity.x = vFinal1.x;
      ball.velocity.y = vFinal1.y;
      otherBall.velocity.x = vFinal2.x;
      otherBall.velocity.y = vFinal2.y;
    }
  }
}
