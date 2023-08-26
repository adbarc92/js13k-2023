import { Player, PhysicsBody, HitPoints, Renderable } from "./components";

import { MOVEMENT_SPEED } from "./constants";
import { draw } from "./draw";

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
    window.addEventListener("keydown", (ev) => {
      if (ev.repeat) {
        keysHeld.push(ev);
      } else {
        keysDown.push(ev);
      }
    });

    window.addEventListener("keyup", (ev) => {
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
      console.log("Move left");
      physics.x -= MOVEMENT_SPEED;
    }
    if (keys.ArrowRight || keys.d) {
      console.log("Move right");
      physics.x += MOVEMENT_SPEED;
    }
    if (keys.ArrowUp || keys.w) {
      console.log("Jump");
    }
    if (keys[" "]) {
      console.log("Strike");
    }
    if (keys.Shift) {
      console.log("Block");
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
    this.selector = ecs.select(PhysicsBody, Renderable);
  }

  drawSprite(entity) {
    /** @type {PhysicsBody} */
    const { x, y } = entity.get(PhysicsBody);
    /** @type {Renderable} */
    const renderable = entity.get(Renderable);
    const spriteName = this.constructSpriteName(renderable);

    draw.drawSprite(spriteName, x, y);
  }

  constructSpriteName(renderable) {
    /** @type {Renderable} */
    const { baseSpriteName, animationState, facingRight, opacity, z, scale } =
      renderable;

    return `${baseSpriteName}_${animationState[0]}${facingRight ? "" : "_f"}`; // FIXME: animation state should be dynamic
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
