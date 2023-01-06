import { coordinates, coordinates as coords, coordIndex } from "./game.js";
import { setteledBlocks } from "./grid.js";
export let counter = 0;
export function controlMovement() {
  document.addEventListener("keyup", (e) => {
    counter++;
    if (counter > 1) return;
    switch (e.key) {
      case "ArrowLeft":
        if (willTouchHorizontalTile(setteledBlocks, -1)) return;
        if (coords[coordIndex].some((el) => el.x === 1)) return;
        coords[coordIndex].forEach((element) => (element.x -= 1));
        break;
      case "ArrowRight":
        if (willTouchHorizontalTile(setteledBlocks, 1)) return;
        if (coords[coordIndex].some((el) => el.x === 14)) return;
        coords[coordIndex].forEach((element) => (element.x += 1));
        break;
      case "ArrowDown":
        if (initialBaseTouchCheck()) return;
        if (willTouchVerticalTile()) return;
        coords[coordIndex].forEach((element) => (element.y += 1));
        break;
      case "ArrowUp":
        rotatePieces();
        break;
    }
  });
  counter = 0;
}

function willTouchHorizontalTile(setteledBlocks, dir) {
  return coords[coordIndex].some((coords) => {
    return setteledBlocks.some((block) =>
      block.some((tile) => coords.x + dir === tile.x && coords.y === tile.y)
    );
  });
}
function willTouchVerticalTile() {
  return coords[coordIndex].some((coord) => {
    return setteledBlocks.some((block) =>
      block.some((tile) => coord.x === tile.x && coord.y + 1 === tile.y)
    );
  });
}

function initialBaseTouchCheck() {
  return coords[coordIndex].some((coord) => coord.y === 24);
}

function rotatePieces() {
  let centerTileCoord = {};
  const newXcoords = [];
  const newYcoords = [];

  if (coordIndex === "o") return;
  if (coordIndex === "z" || coordIndex === "j") {
    centerTileCoord = { ...coordinates[coordIndex][2] };
  } else {
    centerTileCoord = { ...coordinates[coordIndex][1] };
  }
  const relativePositions = createRelativePositions(centerTileCoord);

  relativePositions.forEach((coords, i) => {
    newXcoords.push(coords.x * 0 + coords.y * 1 + centerTileCoord.x);
    newYcoords.push(coords.x * -1 + coords.y * 0 + centerTileCoord.y);

    //save all the new x and y coords in seperate arrays
    //outside of this loop check wether any of the setteled blocks
    //colide with of the new coords
    //if they do return
    //else create a loop which assigns all the new vals to the current block (coordinates[coordIndex])
  });
  if (
    isThereTileCollision(newXcoords, newYcoords) ||
    isTileTouchingBounderies(newXcoords, newYcoords)
  )
    return;
  coordinates[coordIndex].forEach((tile, i) => {
    tile.x = newXcoords[i];
    tile.y = newYcoords[i];
  });
}

function isThereTileCollision(newXs, newYs) {
  return newXs.some((_, j) =>
    setteledBlocks.some((block) =>
      block.some((tile) => {
        return newXs[j] === tile.x && newYs[j] === tile.y;
      })
    )
  );
}

function isTileTouchingBounderies(newXs, newYs) {
  return newXs.some((_, j) => {
    return newXs[j] < 1 || newXs[j] > 13 || newYs[j] > 24 || newYs[j] < 1;
  });
}

function createRelativePositions(centerTileCoord) {
  const relativePositions = [];
  coordinates[coordIndex].forEach((obj, i) => {
    relativePositions.push({
      x: obj.x - centerTileCoord.x,
      y: obj.y - centerTileCoord.y,
    });
  });
  return relativePositions;
}
