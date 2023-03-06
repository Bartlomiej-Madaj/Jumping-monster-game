export class CheckCollision {
    static checkCollisionForCircles(a, b) {
        const dx = a.positionX - b.positionX;
        const dy = a.positionY - b.positionY;
        const distance = Math.hypot(dy, dx);
        const sumOfRadii = a.radious + b.radious;
        return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
      }
    static checkCollisionForRectangle(circle, rectangle) {
        const leftSideRectangle = rectangle.positionX;
        const rightSideRectangle = rectangle.positionX + rectangle.width;
        const topRectangle = rectangle.positionY;
        const leftSideCircle = circle.positionX + circle.radious;
        const rightSideCircle = circle.positionX - circle.radious;
        const bottomCircle = circle.positionY + circle.radious;
        const leftDistance = leftSideRectangle - circle.radious;
        const rightDistance = rightSideRectangle + circle.radious;
        const topDistance = topRectangle - circle.radious;
    
        let isRightCollision = rightSideRectangle >= rightSideCircle;
        let isLeftCollision = leftSideRectangle <= leftSideCircle;
        let isTopCollision = topRectangle <= bottomCircle;
    
        return [
          isLeftCollision,
          isTopCollision,
          isRightCollision,
          leftDistance,
          rightDistance,
          topDistance,
        ];
      }
}