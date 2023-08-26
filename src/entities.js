import { PhysicsBody, Player, Renderable } from './components';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  playerEntityId,
} from './constants';

/**
 * @param {import('./ecs.js').ECS} ecs
 */
export function createPlayer(ecs) {
  const player = new Player();
  const physics = new PhysicsBody(
    Math.floor(CANVAS_WIDTH / 2),
    Math.floor(CANVAS_HEIGHT / 2)
  );
  console.log(`Physics ${JSON.stringify(physics)}`);
  const renderable = new Renderable('spr_0');

  const entity = ecs.create();
  entity.add(player, physics, renderable);
  // playerEntityId = entity.id;
}

/**
 * @param {import('./ecs.js').ECS} ecs
 */
export const startNewGame = (ecs) => {
  ecs.reset();
  createPlayer(ecs);
};
