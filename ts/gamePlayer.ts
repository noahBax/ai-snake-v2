import Apple, { goingToEatApple, spawnApple } from "./Board/apple.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import { clearGameCanvas } from "./DrawingTools/clearGameCanvas.js";
import { drawSnakeSegment } from "./DrawingTools/drawSnakeSegment.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import { drawApple, drawHead, drawSnakeBody } from "./drawThings.js";
import exploreSnake from "./Exploration/exploreSnake.js";
import { consumeKeyBuffer, initController, keysBuffer } from "./personalController.js";
import createSnake from "./Snake/createSnake.js";
import goingToEatSelf from "./Snake/goingToEatSelf.js";
import incrementSnake from "./Snake/incrementSnake.js";
import moveSnake from "./Snake/moveSnake.js";
import { SnakeEnd, SnakeSummary, BoardNode, SnakeNode, isSnakeEnd } from "./snakeNodes.js";

var snakeSummary: SnakeSummary;

const BOARD_WIDTH  = 10;
const BOARD_HEIGHT = 10;
const DRAW_NODE_SIZE = 40;
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
		snakeFront: snake,
		snakeBack: snakeTail,
		snakeHead: snake.headBoundNode as SnakeEnd,
		snakeTail: snakeTail.tailBoundNode,  // How tf does TS pick this up but can't type guard?
		boardNodes: boardNodes,
		boardWidth: BOARD_WIDTH,
		boardHeight: BOARD_HEIGHT
	}
	window.snakeSummary = snakeSummary;

	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);
	initController();

	// Spawn the apple
	spawnApple(snakeSummary, appleNow);

	// Choose a place for the future apple
	// spawnApple()

	// Determine path
	const e = exploreSnake(snakeSummary, appleNow);
	console.log(e);
	if (e != undefined) {
		for (const m in e.path) {
			keysBuffer.push(e.path[m]);
		}
	}

	// GAME_LOOP = setInterval(tick, 125);
	requestAnimationFrame(tick);

}

function tick() {

	if (keysBuffer.length == 0) {
		console.log('Key buffer empty, Game Over');
		// clearInterval(GAME_LOOP);
		drawSnake();
		return;
	}
	
	// Process move
	consumeKeyBuffer(snakeSummary);
	
	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Hit wall, Game Over');
		// clearInterval(GAME_LOOP);
		drawSnake();
		return;
	}
	
	if (goingToEatSelf(snakeSummary)) {
		console.log('Ate self, Game Over');
		// clearInterval(GAME_LOOP);
		drawSnake();
		return;
	}
	

	if (goingToEatApple(snakeSummary, appleNow)) {
		snakeSummary = incrementSnake(snakeSummary);
		spawnApple(snakeSummary, appleNow);
		drawSnake();
		
		if (keysBuffer.length != 0) {
			console.log('More than one key left, Game Over');
			// clearInterval(GAME_LOOP);
			return;
		}
		
		// Determine path
		const e = exploreSnake(snakeSummary, appleNow);
		console.log(e);
		if (e != undefined) {
			for (const m in e.path) {
				keysBuffer.unshift(e.path[m]);
			}
			console.log(`Found a path: ${keysBuffer.join(', ')}`);
		}
	} else {
		snakeSummary = moveSnake(snakeSummary);
	}


	// Redraw
	drawSnake();
	requestAnimationFrame(tick);
}

window.tick = tick;


export function drawSnake() {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	// // Visualize the ends
	// drawSnakeSegment(snakeSummary.snakeHead, "#00F");
	// drawSnakeSegment(snakeSummary.snakeTail, "#00F");
	
	// Loop over each snake node and draw it
	
	// But first visualize the front
	// drawSnakeSegment(currentSegment, "#FFA500");
	// currentSegment = currentSegment.tailBoundNode;
	
	// // Loop over all snake segments until the tail node
	// while (!isSnakeEnd(currentSegment)) {

	// 	drawSnakeSegment(currentSegment);

	// 	currentSegment = currentSegment.tailBoundNode;
	// }
	drawSnakeBody(snakeSummary);
	drawHead(snakeSummary);

	// Draw the apple
	drawApple(appleNow);
}