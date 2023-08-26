import { Player, PhysicsBody, HitPoints, Renderable } from "./components";

import { MOVEMENT_SPEED } from "./constants";

/* Input */

/** @type {KeyboardEvent[]} */
let keysDown = [];
/** @type {KeyboardEvent[]} */
let keysUp = [];
/** @type {KeyboardEvent[]} */
let keysHeld = [];

// window.addEventListener("keydown", (ev) => {
//   console.log("Registering keydown listeners");
//   if (ev.repeat) {
//     keysHeld.push(ev);
//   } else {
//     keysDown.push(ev);
//   }
// });

// window.addEventListener("keyup", (ev) => {
//   console.log("Registering keydown listeners");
//   keysUp.push(ev);
// });

// const handleKeyUpdate = (player, physics) => {
//   // if (hp.hp <= 0 || getBaseEntity(ecs).get(HitPoints).hp <= 0) {
//   //   return;
//   // }

//   let accelerating = false;
//   let acceleratingReverse = false;
//   const keys = player.keys;

//   if (keys.ArrowLeft || keys.a) {
//     // Move Left: change animation, set -X velocity, set +X acc
//     console.log("Move left");
//     physics.vx = -MOVEMENT_SPEED;
//   }
//   if (keys.ArrowRight || keys.d) {
//     // Move Right: change animation, set +X velocity, set -X acc
//     console.log("Move right");
//     physics.vx = MOVEMENT_SPEED;
//   }
//   if (keys.ArrowUp || keys.w) {
//     console.log("Jump");
//     // Jump || Double Jump:
//   }
//   if (keys.Space) {
//     console.log("Strike");
//     // Attack
//   }
//   if (keys.Shift) {
//     console.log("Block");

//     // Deflect || Block
//   }
// };

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
    // if (hp.hp <= 0 || getBaseEntity(ecs).get(HitPoints).hp <= 0) {
    //   return;
    // }

    const keys = player.keys;

    if (keys.ArrowLeft || keys.a) {
      // Move Left: change animation, set -X velocity, set +X acc
      console.log("Move left");
      physics.vx = -MOVEMENT_SPEED;
    }
    if (keys.ArrowRight || keys.d) {
      // Move Right: change animation, set +X velocity, set -X acc
      console.log("Move right");
      physics.vx = MOVEMENT_SPEED;
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
      const { Player, PhysicsBody } = entity;
      /** @type {PhysicsBody} */
      const physics = entity.get(PhysicsBody);
      /** @type {Player} */
      const player = entity.get(Player);
      handleKeyUpdate(player, physics);

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
export function RenderActors(ecs) {
  const sprites = ecs.select(PhysicsBody, Renderable);
}

/**
 * @param {import('./ecs.js').ECS} ecs
 * @returns {object[]}
 */
export const getSystems = (ecs) => [new Input(ecs)];
