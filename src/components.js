import { draw } from "./draw.js";

// FIXME: need a mechanism for governing game speed

/* System */

export class Player {
  /** @type {Record<string, boolean>} */
  keys = {};
  score = 0;
  gameOver = false;
  gameStarted = false;
  firstScreenUiVisible = false;

  /** @param {string} key */
  setKeyDown(key) {
    this.keys[key] = true;
  }
  /** @param {string} key */
  setKeyUp(key) {
    this.keys[key] = false;
  }
}

export class Ai {}

export class MongolianHoard {
  faction = 0;
  waveNumber = 0;
}

export class Camera {
  x = 0;
  y = 0;
  w = draw.SCREEN_WIDTH;
  h = draw.SCREEN_HEIGHT;
}

export class Ui {}

export class LimitedLifetime {}

/* Physics */

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

/* Drawing */

export class Renderable {}

export class HitHighlightRender {}

export class StrikeHighlightRender {}

export class Speaker {}

/* Stats */

export class HitPoints {
  max = 2;
  current = 1;

  /**
   * @param {number} hp
   */
  constructor(hp) {
    this.current = this.max = hp;
  }
}

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

/* Actions */

export class Melee {
  damage = 1;
  attacking = false;
}

export class Shooter {}

export class Dash {} // Includes afterimage animation

export class Jump {}

export class Block {}

export class TimeSlow {
  adrenaline = 0;
  active = false;
}

export const getComponents = () => [
  Player,
  Ai,
  MongolianHoard,
  Camera,
  Ui,
  LimitedLifetime,
  PhysicsBody,
  Moving,
  Projectile,
  Renderable,
  HitHighlightRender,
  StrikeHighlightRender,
  HitPoints,
  HitBody,
  Melee,
  Shooter,
  Dash,
  Jump,
  Block,
  TimeSlow,
];
