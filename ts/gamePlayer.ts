import Apple, { goingToEatApple, spawnApple } from "./Board/apple.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import findGroups from "./Board/findGroups.js";
import { initFrameManager } from "./DrawingTools/frameManager.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import { snakeDrawBuffer } from "./DrawingTools/snakeDrawBuffer.js";
import Configuration from "./Exploration/configuration.js";
import expandAtNode from "./Exploration/expandAtNode.js";
import exploreSnake from "./Exploration/exploreSnake.js";
import getPathFromExpedition from "./Exploration/getPathFromExpedition.js";
import { globalMoves, globalProgress, increaseMoves, incrementProgress } from "./performanceTracking.js";
import { consumeKeyBuffer, initController, keysBuffer } from "./personalController.js";
import { BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE, MOVES_LIMIT } from "./preferences.js";
import createSnake from "./Snake/createSnake.js";
import createSnakeCopy from "./Snake/createSnakeCopy.js";
import goingToEatSelf from "./Snake/goingToEatSelf.js";
import incrementSnake from "./Snake/incrementSnake.js";
import moveSnake from "./Snake/moveSnake.js";
import { SnakeSummary, BoardNode } from "./snakeNodes.js";
import { enableTraining, IN_TRAINING } from "./trainingModule.js";

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
var gameRunning: HTMLSpanElement;
export var spriteSheetImage: HTMLImageElement;
export var spriteSheetExploringImage: HTMLImageElement;
export var spriteSheetBadImage: HTMLImageElement;
var lengthEle: HTMLSpanElement;

export function trainerInit(config: Configuration): void {
	enableTraining();
	createInitialSnake();
	pathToFirstApple(config);
}

export function init(config: Configuration): void {
	initDOMStuff();
	createInitialSnake();
	pathToFirstApple(config);
}

function initDOMStuff(): void {
	spriteSheetImage = document.getElementById("spriteSheet") as HTMLImageElement;
	spriteSheetExploringImage = document.getElementById("spriteSheetExploring") as HTMLImageElement;
	spriteSheetBadImage = document.getElementById("spriteSheetBad") as HTMLImageElement;
	gameRunning = document.getElementById('gameRunning');
	lengthEle = document.getElementById('numSnakeNodes');

	window.snakeSummary = snakeSummary;
	window.snakeDrawBuffer = snakeDrawBuffer;
	window.attempts = 0;
	window.emptyNode = EMPTY_NODE;
	window.tick = snakeTickFunction;
	window.findGroups = findGroups;
	window.expandAtNode = expandAtNode;


	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);
	initController();
	initFrameManager();
}

function createInitialSnake(): void {
	const boardNodes: BoardNode[] = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
	snakeSummary = createSnake(boardNodes);
}

function pathToFirstApple(config: Configuration): void {
	// Spawn the apple
	spawnApple(snakeSummary, appleNow);

	// Determine path
	const e = exploreSnake(createSnakeCopy(snakeSummary), appleNow, config);
	getPathFromExpedition(e, keysBuffer);
}

export function quickTick(config: Configuration) {

	if (!IN_TRAINING)
		lengthEle.innerText = '' + globalProgress;

	incrementProgress();
	while (keysBuffer.length > 0) {
		consumeKeyBuffer(snakeSummary);
		if (keysBuffer.length > 0)
			snakeSummary = moveSnake(snakeSummary);
	}

	snakeSummary = incrementSnake(snakeSummary);
	spawnApple(snakeSummary, appleNow);

	const e = exploreSnake(snakeSummary, appleNow, config);
	getPathFromExpedition(e, keysBuffer);

	if (keysBuffer.length == 0) {
		if (!IN_TRAINING) {
			gameRunning.innerText = 'FALSE: move buffer empty';
			console.log('There are', globalMoves, 'moves');
		}
		gameActive = false;
	} else {
		increaseMoves(keysBuffer.length);
	}

	if (!IN_TRAINING)
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
}

export function snakeTickFunction(config: Configuration) {

	if (keysBuffer.length == 0) {
		console.log('Key buffer empty, Game Over');
		gameRunning.innerText = 'FALSE: move buffer empty';
		gameActive = false;
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		return;
	}
	
	// Process move
	consumeKeyBuffer(snakeSummary);
	
	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Hit wall, Game Over');
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		gameRunning.innerText = 'FALSE: head in wall';
		gameActive = false;
		return;
	}
	
	if (goingToEatSelf(snakeSummary)) {
		console.log('Ate self, Game Over');
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
		gameRunning.innerText = 'FALSE: ran into self';
		gameActive = false;
		return;
	}
	

	if (goingToEatApple(snakeSummary, appleNow)) {
		snakeSummary = incrementSnake(snakeSummary);
		spawnApple(snakeSummary, appleNow);
		
		if (keysBuffer.length != 0) {
			console.log('More than one key left, Game Over');
			gameRunning.innerText = 'FALSE: extra moves in move buffer';
			snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
			gameActive = false;
			return;
		}
		
		// Determine path
		const e = exploreSnake(snakeSummary, appleNow, config);
		getPathFromExpedition(e, keysBuffer);
		increaseMoves(keysBuffer.length);
		incrementProgress()

		if (!IN_TRAINING)
			lengthEle.innerText = '' + globalProgress;

	} else {
		snakeSummary = moveSnake(snakeSummary);
	}

	// Redraw
	snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}, 0]);
}



