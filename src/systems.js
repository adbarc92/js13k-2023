import { Player, PhysicsBody, HitPoints, Renderable } from "./components";

import { MOVEMENT_SPEED } from "./constants";

/* Input */

/** @type {KeyboardEvent[]} */
let keysDown = [];
/** @type {KeyboardEvent[]} */
let keysUp = [];
/** @type {KeyboardEvent[]} */
let keysHeld = [];

/** @param {import('./ecs.js').ECS} ecs */
export class Input {
  constructor(ecs) {
    this.selector = ecs.select(Player, PhysicsBody);
    this.registerEventListeners();
  }

  registerEventListeners = () => {
    console.log("Registering input event listeners"); // FIXME: Remove after debugging
    window.addEventListener("keydown", (ev) => {
      if (ev.repeat) {
        keysHeld.push(ev);
      } else {
        console.log(`Keydown: ${ev.key}`); // FIXME: Remove after debugging
        keysDown.push(ev);
      }
    });

    window.addEventListener("keyup", (ev) => {
      console.log(`Keyup: ${ev.key}`); // FIXME: Remove after debugging
      keysUp.push(ev);
    });
  };

  /**
   * @param {Player} player
   * @param {PhysicsBody} physics
   * @param {HitPoints} hp
   */
  handleKeyUpdate = (player, physics) => {
    const keys = player.keys;

    if (keys.ArrowLeft || keys.a) {
      // Move Left: change animation, set -X velocity, set +X acc
      console.log("Move left");
      physics.x -= MOVEMENT_SPEED;
    }
    if (keys.ArrowRight || keys.d) {
      // Move Right: change animation, set +X velocity, set -X acc
      console.log("Move right");
      physics.x += MOVEMENT_SPEED;
    }
    if (keys.ArrowUp || keys.w) {
      console.log("Jump");
      // Jump || Double Jump:
    }
    if (keys.Space) {
      console.log("Strike");
      // Attack
    }
    if (keys.Shift) {
      console.log("Block");
      // Deflect || Block
    }
  };

  update(delta) {
    this.selector.iterate((entity) => {
      /** @type {PhysicsBody} */
      const physics = entity.get(PhysicsBody);
      /** @type {Player} */
      const player = entity.get(Player);
      keysDown.forEach((ev) => player.setKeyDown(ev.key));
      keysUp.forEach((ev) => player.setKeyUp(ev.key));
      this.handleKeyUpdate(player, physics);

      if (keysUp.length) {
        keysUp = [];
      }
      if (keysDown.length) {
        keysDown = [];
      }
    });
  }
}

/* Render */

/** @param {import('./ecs.js').ECS} ecs */
export class Render {
  constructor(ecs) {
    console.log("Initializing render");
    this.selector = ecs.select(PhysicsBody, Renderable);
  }

  drawSprite(entity) {
    /** @type {PhysicsBody} */
    const { x, y } = entity.get(PhysicsBody);
    /** @type {Renderable} */
    const { spriteName, opacity, scale, z } = entity.get(Renderable);

    draw.setOpacity(opacity);
    draw.drawSprite(spriteName, x, y);
  }

  update(delta) {
    this.selector.iterate((entity) => {
      this.drawSprite(entity);
    });
  }
}

/**
 * @param {import('./ecs.js').ECS} ecs
 * @returns {object[]}
 */
export const getSystems = (ecs) => [new Input(ecs), new Render(ecs)];
