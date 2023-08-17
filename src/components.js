//

export class PhysicsBody {
  vx = 0;
  vy = 0;
  ax = 0;
  ay = 0;
  mass = 1;
  acc = false;

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
export class Moving {}

export class Projectile {}

//

export class Renderable {}

export class HitHighlightRender {}

export class StrikeHighlightRender {}

//

export class LimitedLifetime {}

//

export class Player {}

export class Ai {}

export class StupidMongolians {}

//

export class Camera {}

export class Ui {}

// Stats

export class HitPoints {}

export class HitBody {
  x1 = 0;
  y1 = 0;
  x2 = 1;
  y2 = 1;
  damaging = false;

  /**
   * @param {number} x1
   * @param {number} x2
   * @param {number} y1
   * @param {number} y2
   */
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
}

// Actions

export class Melee {}

export class Shooter {}

export class Dash {}

export class Jump {}

export class Block {}

export class TimeSlow {
  adrenaline = 0;
  active = false;
}
