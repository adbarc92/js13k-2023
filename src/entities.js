import { PhysicsBody } from "./components";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

/**
 * @param {import('./ecs.js').ECS} ecs
 */
export function createPlayer(ecs) {
  const physics = new PhysicsBody(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}
