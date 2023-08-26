import { getComponents } from "./src/components";
import { EXPECTED_FS } from "./src/constants";
import { Debug } from "./src/debug";
import { draw } from "./src/draw";
import { ecs } from "./src/ecs.js";
import { startNewGame } from "./src/entities";
import { Input, getSystems } from "./src/systems";

/**
 * @param {number} frameTime
 */
const integrate = (frameTime) => {
  draw.clear();
  ecs.update(frameTime / 1000);
};

const executeCoreGameLoop = () => {
  const startTime = performance.now();
  let prevNow = startTime;

  const _loop = () => {
    const now = performance.now();
    let frameTime = now - prevNow;
    let prevFrameTime = Math.floor(frameTime);
    prevNow = now;

    if (frameTime > 4) {
      frameTime = 4;
    }
    const deltaTime = frameTime;
    frameTime -= deltaTime;
    const fm = deltaTime / EXPECTED_FS;
    draw.fm = fm;
    draw.enabled = frameTime <= 0;
    integrate(deltaTime);
  };
  setInterval(_loop, 16);
};

export const start = () => {
  console.log("app starting");

  ecs.register(...getComponents());
  ecs.process(...getSystems(ecs));

  // const debug = new Debug();
  // debug.listSprites();

  startNewGame(ecs);
  executeCoreGameLoop();
};

window.addEventListener("load", async () => {
  await draw.init();
  window.addEventListener("resize", () => {
    draw.handleResize();
  });
  window.draw = draw;
  console.log("app loaded");
  start();
});
