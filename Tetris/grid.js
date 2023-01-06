import {
  board,
  blockColors,
  scoreBoard,
  levelBoard,
  statusBoard,
} from "./config.js";
import { coordIndex, coordinates, id1, id2 } from "./game.js";
export let setteledBlocks = [];
export let setteledDivs = [];
let colorsInOrder = [];
export function hasHit() {
  addScore(checkForFullRows());
  if (
    coordinates[coordIndex].some(
      (el) => el.y === 24 || isTouchingOtherTiles(el)
    )
  ) {
    setteledBlocks.push(coordinates[coordIndex]);
    createSetteledBlockElements();
    removeFullRows(checkForFullRows());
    if (hasLost()) return;
    return true;
  }
}

function hasLost() {
  if (coordinates[coordIndex].some((tile) => tile.y < 5)) {
    cancelAnimationFrame(id1);
    cancelAnimationFrame(id2);
    statusBoard.textContent = "You Lost";
    window.alert("YOU LOST");
    return true;
  }
}

function createSetteledBlockElements() {
  colorsInOrder.push(blockColors[coordIndex]);

  setteledBlocks.forEach((block, i) => {
    block.forEach((coord) => {
      if (i === setteledBlocks.length - 1) {
        const block = document.createElement("div");
        block.classList.add(".block");
        block.style.backgroundColor = blockColors[coordIndex];
        block.style.gridRowStart = coord.y;
        block.style.gridColumnStart = coord.x;
        setteledDivs.push(block);
        board.appendChild(block);
      }
    });
  });
}
function createSetteledBlockElementsAfterScore() {
  console.log(colorsInOrder);
  setteledDivs.forEach((div) => div.remove());

  setteledBlocks.forEach((block, i) => {
    block.forEach((coord) => {
      const block = document.createElement("div");
      block.classList.add(".block");
      block.style.backgroundColor = colorsInOrder[i];
      block.style.gridRowStart = coord.y;
      block.style.gridColumnStart = coord.x;
      setteledDivs.push(block);
      board.appendChild(block);
    });
  });
}

function isTouchingOtherTiles(el) {
  return setteledBlocks.some((block) =>
    block.some((tile) => tile.x === el.x && tile.y === el.y + 1)
  );
}

function checkForFullRows() {
  let yAxes = [];
  const fullRows = [];
  setteledBlocks.forEach((block) => {
    block.forEach((tile) => {
      yAxes[tile.y] === undefined ? (yAxes[tile.y] = 0) : yAxes[tile.y]++;
    });
  });
  yAxes.forEach((count, i) => {
    if (count === 13) fullRows.push(i);
  });

  // yAxes = [];
  return fullRows;
}

let tempSetteledBlocks = [];
let aBlock = [];
function removeFullRows(fullRows) {
  if (fullRows.length === 0) return;
  addScore(fullRows);
  //remove the full board from all its elements
  //go into the setteled blocks and remove all the tiles with the specified row index
  setteledBlocks.forEach((block, x) => {
    block.forEach((tile, i) => {
      if (fullRows.every((rowNumber) => tile.y !== rowNumber)) {
        if (fullRows.some((rowNumber) => tile.y < rowNumber)) {
          fullRows.forEach(() => tile.y++);
        }
        aBlock.push(tile);
      }
      //all the rows above the full rows should get their y-axis decreased by 1
    });
    tempSetteledBlocks.push(aBlock);
    aBlock = [];
  });

  setteledBlocks = clone(tempSetteledBlocks);
  //   //call the createSetteledBlockElements() so the board gets re constructed
  //reset the settled divs
  // console.log(setteledBlocks);

  tempSetteledBlocks = [];
  // setteledDivs = [];
  createSetteledBlockElementsAfterScore();
  removeFullRows(checkForFullRows());
}
function addScore(fullRows) {
  fullRows.forEach(() => {
    scoreBoard.textContent++;
    if (scoreBoard.textContent === "5") {
      scoreBoard.textContent = 0;
      levelUp();
    }
  });
}

function levelUp() {
  levelBoard.textContent++;
}
const clone = (items) =>
  items.map((item) => {
    if (Array.isArray(item)) {
      return clone(item);
    } else if (typeof item === "object") {
      return Object.assign({}, item);
    }
  });
