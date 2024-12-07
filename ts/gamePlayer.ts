import { drawApple, goingToEatApple, spawnApple } from "./Board/apple.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import { clearGameCanvas } from "./DrawingTools/clearGameCanvas.js";
import { drawSnakeSegment } from "./DrawingTools/drawSnakeSegment.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import { consumeKeyBuffer, initController } from "./personalController.js";
import createSnake from "./Snake/createSnake.js";
import incrementSnake from "./Snake/incrementSnake.js";
import moveSnake from "./Snake/moveSnake.js";
import { SnakeEnd, SnakeSummary, BoardNode, SnakeNode, isSnakeEnd } from "./snakeNodes.js";

var snakeSummary: SnakeSummary;

const BOARD_WIDTH  = 20;
const BOARD_HEIGHT = 20;
const DRAW_NODE_SIZE = 20;

var GAME_LOOP: NodeJS.Timeout;

export function init() {

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
	spawnApple(snakeSummary);

	GAME_LOOP = setInterval(tick, 125);

}

function tick() {
	
	// Process move
	consumeKeyBuffer(snakeSummary);

	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Game Over');
		clearInterval(GAME_LOOP);
		return;
	}

	if (goingToEatApple(snakeSummary)) {
		snakeSummary = incrementSnake(snakeSummary);
		spawnApple(snakeSummary);
	} else {
		snakeSummary = moveSnake(snakeSummary);
	}


	// Redraw
	drawSnake();

}

window.tick = tick;


export function drawSnake() {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	// Visualize the ends
	drawSnakeSegment(snakeSummary.snakeHead, "#00F");
	drawSnakeSegment(snakeSummary.snakeTail, "#00F");
	
	// Loop over each snake node and draw it
	let currentSegment: SnakeEnd | SnakeNode = snakeSummary.snakeFront;
	
	// But first visualize the front
	drawSnakeSegment(currentSegment, "#FFA500");
	currentSegment = currentSegment.tailBoundNode;
	
	// Loop over all snake segments until the tail node
	while (!isSnakeEnd(currentSegment)) {

		drawSnakeSegment(currentSegment);

		currentSegment = currentSegment.tailBoundNode;
	}

	// Draw the apple
	drawApple();
}