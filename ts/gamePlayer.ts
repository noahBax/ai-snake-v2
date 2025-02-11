import Apple, { goingToEatApple, spawnApple } from "./Board/apple.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import { unlock_tick } from "./DrawingTools/frameLocks.js";
import { initFrameManager } from "./DrawingTools/frameManager.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import { snakeDrawBuffer } from "./DrawingTools/snakeDrawBuffer.js";
import Expedition from "./Exploration/expedition.js";
import exploreSnake from "./Exploration/exploreSnake.js";
import getPathFromExpedition from "./Exploration/getPathFromExpedition.js";
import { consumeKeyBuffer, initController, keysBuffer } from "./personalController.js";
import { BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE } from "./preferences.js";
import createSnake from "./Snake/createSnake.js";
import createSnakeCopy from "./Snake/createSnakeCopy.js";
import goingToEatSelf from "./Snake/goingToEatSelf.js";
import incrementSnake from "./Snake/incrementSnake.js";
import moveSnake from "./Snake/moveSnake.js";
import { SnakeEnd, SnakeSummary, BoardNode, isSnakeEnd } from "./snakeNodes.js";

var snakeSummary: SnakeSummary;

var appleNow: Apple = {
	board_x: 0,
	board_y: 0
};
var appleSoon: Apple = {
	board_x: 0,
	board_y: 0
};

export var gameActive = true;
const gameRunning: HTMLSpanElement = document.getElementById('gameRunning');
export var spriteSheetImage: HTMLImageElement;
export var spriteSheetExploringImage: HTMLImageElement;
export var spriteSheetBadImage: HTMLImageElement;
var lengthEle: HTMLSpanElement;


export function init() {

	spriteSheetImage = document.getElementById("spriteSheet") as HTMLImageElement;
	spriteSheetExploringImage = document.getElementById("spriteSheetExploring") as HTMLImageElement;
	spriteSheetBadImage = document.getElementById("spriteSheetBad") as HTMLImageElement;
	
	// Populate a board and return a list of nodes
	const boardNodes: BoardNode[] = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

	lengthEle = document.getElementById('numSnakeNodes');

	// Create a template snake. Template is 2 nodes long with 1 head and 1 tail.
	// This function returns the front of the snake and NOT the head. So it does
	// have a headBoundNode.
	snakeSummary = createSnake(boardNodes);

	console.log("Snakehead", snakeSummary.snakeHead);

	window.snakeSummary = snakeSummary;

	window.snakeDrawBuffer = snakeDrawBuffer;

	window.attempts = 0;

	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);
	initController();
	initFrameManager();

	// Spawn the apple
	spawnApple(snakeSummary, appleNow);

	// Choose a place for the future apple
	// spawnApple()

	// Determine path
	const e = exploreSnake(createSnakeCopy(snakeSummary), appleNow);
	getPathFromExpedition(e, keysBuffer);

	// GAME_LOOP = setInterval(tick, 125);
	unlock_tick();
	// requestAnimationFrame(snakeTickFunction);

}

export async function quickTick() {

	lengthEle.innerText = '' + snakeSummary.length;

	while (keysBuffer.length > 0) {
		consumeKeyBuffer(snakeSummary);
		if (keysBuffer.length > 0)
			snakeSummary = moveSnake(snakeSummary);
	}

	snakeSummary = incrementSnake(snakeSummary);
	spawnApple(snakeSummary, appleNow);

	const e = exploreSnake(snakeSummary, appleNow);
	getPathFromExpedition(e, keysBuffer);

	if (keysBuffer.length == 0) {
		gameRunning.innerText = 'FALSE';
		gameActive = false;
	}

	
	snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
	unlock_tick();
}

export async function snakeTickFunction() {

	if (keysBuffer.length == 0) {
		console.log('Key buffer empty, Game Over');
		gameRunning.innerText = 'false';
		gameActive = false;
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		return;
	}
	
	// Process move
	consumeKeyBuffer(snakeSummary);
	
	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Hit wall, Game Over');
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		gameRunning.innerText = 'false';
		gameActive = false;
		return;
	}
	
	if (goingToEatSelf(snakeSummary)) {
		console.log('Ate self, Game Over');
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		gameRunning.innerText = 'false';
		gameActive = false;
		return;
	}
	

	if (goingToEatApple(snakeSummary, appleNow)) {
		snakeSummary = incrementSnake(snakeSummary);
		spawnApple(snakeSummary, appleNow);
		
		if (keysBuffer.length != 0) {
			console.log('More than one key left, Game Over');
			gameRunning.innerText = 'false';
			snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
			// clearInterval(GAME_LOOP);
			gameActive = false;
			return;
		}
		
		// Determine path
		const e = exploreSnake(snakeSummary, appleNow);
		getPathFromExpedition(e, keysBuffer);
	} else {
		snakeSummary = moveSnake(snakeSummary);
	}

	// Redraw
	snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
	unlock_tick();
}

window.tick = snakeTickFunction;


