"use strict ";
// console.log("whats");
import { controlMovement } from "./controller.js";
import { SPEED, updateVertical, draw } from "./blocks.js";
import { resetCoords } from "./blocksCoords.js";
import { hasHit, setteledBlocks } from "./grid.js";
import { blockNames } from "./config.js";
import { board } from "./config.js";
const randCoordIndexGen = () => {
  return blockNames[Math.floor(Math.random() * 7)];
};
export let coordinates = resetCoords();
export let coordIndex = randCoordIndexGen();
export let id1, id2;
let lastCount = 0;
function main(counter) {
  id1 = window.requestAnimationFrame(main);
  const secondsSinceLastRender = (counter - lastCount) / 1000;
  if (secondsSinceLastRender < 1 / SPEED) return;
  lastCount = counter;

  if (hasHit()) {
    coordIndex = randCoordIndexGen();
    coordinates = resetCoords();
    cancelAnimationFrame(id1);
    cancelAnimationFrame(id2);
    window.requestAnimationFrame(main);
    window.requestAnimationFrame(main2);
  } else {
    updateVertical();
    draw(board);
  }
}
let lastCount2 = 0;
function main2(counter) {
  id2 = window.requestAnimationFrame(main2);
  const secondsSinceLastRender = (counter - lastCount2) / 1000;
  if (secondsSinceLastRender < 1 / 20) return;
  lastCount2 = counter;
  controlMovement();
  draw(board);
}

window.requestAnimationFrame(main);
window.requestAnimationFrame(main2);
