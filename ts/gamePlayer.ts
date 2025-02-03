import Apple, { goingToEatApple, spawnApple } from "./Board/apple.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import { unlock_tick } from "./DrawingTools/frameLocks.js";
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

export var spriteSheetImage: HTMLImageElement;

export function init() {

	spriteSheetImage = document.getElementById("spriteSheet") as HTMLImageElement;
	
	// Populate a board and return a list of nodes
	const boardNodes: BoardNode[] = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

	// Create a template snake. Template is 2 nodes long with 1 head and 1 tail.
	// This function returns the front of the snake and NOT the head. So it does
	// have a headBoundNode.
	const snake = createSnake(boardNodes, BOARD_WIDTH, BOARD_HEIGHT);

	console.log("Snakehead", snake)

	// We need to find the tail node that got created in createSnake
	let snakeTail = snake;
	while(!isSnakeEnd(snakeTail.tailBoundNode))
		snakeTail = snakeTail.tailBoundNode;

	snakeSummary = {
		length: 2,
		snakeFront: snake,
		snakeBack: snakeTail,
		snakeHead: snake.headBoundNode as SnakeEnd,
		snakeTail: snakeTail.tailBoundNode,  // How tf does TS pick this up but can't type guard?
		boardNodes: boardNodes,
		boardWidth: BOARD_WIDTH,
		boardHeight: BOARD_HEIGHT
	}
	window.snakeSummary = snakeSummary;

	window.snakeDrawBuffer = snakeDrawBuffer;

	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);
	initController();

	// Spawn the apple
	spawnApple(snakeSummary, appleNow);

	// Choose a place for the future apple
	// spawnApple()

	// Determine path
	const e = exploreSnake(snakeSummary, appleNow);
	getPathFromExpedition(e, keysBuffer);

	// GAME_LOOP = setInterval(tick, 125);
	unlock_tick();
	// requestAnimationFrame(snakeTickFunction);

}

export async function snakeTickFunction() {

	if (keysBuffer.length == 0) {
		console.log('Key buffer empty, Game Over');
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}]);
		return;
	}
	
	// Process move
	consumeKeyBuffer(snakeSummary);
	
	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Hit wall, Game Over');
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}]);
		return;
	}
	
	if (goingToEatSelf(snakeSummary)) {
		console.log('Ate self, Game Over');
		// clearInterval(GAME_LOOP);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}]);
		return;
	}
	

	if (goingToEatApple(snakeSummary, appleNow)) {
		snakeSummary = incrementSnake(snakeSummary);
		spawnApple(snakeSummary, appleNow);
		snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}]);
		
		if (keysBuffer.length != 0) {
			console.log('More than one key left, Game Over');
			// clearInterval(GAME_LOOP);
			return;
		}
		
		// Determine path
		const e = exploreSnake(snakeSummary, appleNow);
		getPathFromExpedition(e, keysBuffer);
	} else {
		snakeSummary = moveSnake(snakeSummary);
	}

	// Redraw
	snakeDrawBuffer.push([createSnakeCopy(snakeSummary), {...appleNow}]);
	unlock_tick();
}

window.tick = snakeTickFunction;


