import { getComponents } from "./src/components";
import { Debug } from "./src/debug";
import { draw } from "./src/draw";
import { ecs } from "./src/ecs.js";
import { getSystems } from "./src/systems";

export const start = () => {
  console.log("app starting");

  ecs.register(...getComponents());
  ecs.process(...getSystems());

  const debug = new Debug();
  debug.listSprites();
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
