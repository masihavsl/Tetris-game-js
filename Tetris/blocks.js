import { coordinates, coordIndex } from "./game.js";
export const SPEED = 2;
export let blocks = [];
import { blockColors } from "./config.js";

export function updateVertical() {
  coordinates[coordIndex].forEach((coord) => {
    coord.y += 1;
  });
  // console.log("update");
}

export function draw(board) {
  removeOldBlocks();
  generateBlocks();
  blocks.forEach((block) => {
    board.appendChild(block);
  });
  // console.log("draw");
}

function generateBlocks() {
  blocks = coordinates[coordIndex].map((coord) => {
    const block = document.createElement("div");
    block.style.backgroundColor = blockColors[coordIndex];

    block.style.gridRowStart = coord.y;
    block.style.gridColumnStart = coord.x;
    return block;
  });
}

const removeOldBlocks = () => blocks.forEach((block) => block.remove());
