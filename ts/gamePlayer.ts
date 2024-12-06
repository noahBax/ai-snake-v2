import accessNodeRelation from "./Board/accessNodeRelation.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { clearGameCanvas } from "./DrawingTools/clearGameCanvas.js";
import { drawSnakeSegment } from "./DrawingTools/drawSnakeSegment.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import { initController } from "./personalController.js";
import createSnake from "./Snake/createSnake.js";
import { SnakeEnd, SnakeSummary, BoardNode, SnakeNode } from "./snakeNodes.js";

export var snakeSummary: SnakeSummary;

const BOARD_WIDTH  = 20;
const BOARD_HEIGHT = 20;
const DRAW_NODE_SIZE = 20;

var GAME_LOOP: NodeJS.Timeout;

export function init() {

	const boardNodes: BoardNode[] = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
	const snake = createSnake(boardNodes, BOARD_WIDTH, BOARD_HEIGHT);

	console.log("Snakehead", snake)

	let snakeBack = snake;
	while(!isSnakeEnd(snakeBack.tailBoundNode))
		snakeBack = snakeBack.tailBoundNode;

	snakeSummary = {
		snakeFront: snake,
		snakeBack: snakeBack,
		snakeHead: snake.headBoundNode as SnakeEnd,
		snakeTail: snakeBack.tailBoundNode,  // How tf does TS pick this up but can't type guard?
		boardNodes: boardNodes,
		boardWidth: BOARD_WIDTH,
		boardHeight: BOARD_HEIGHT
	}
	window.snakeSummary = snakeSummary;

	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);
	initController();

	GAME_LOOP = setInterval(tick, 250);

}

function tick() {

	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Game Over');
		clearInterval(GAME_LOOP);
		return;
	}

	// const snakeHead = currentKit.;
	// const snakeTail = currentKit.;

	const oldSnakeFront = snakeSummary.snakeFront as SnakeNode
	const newSnakeFront = snakeSummary.snakeBack as SnakeNode;
	const newSnakeBack = newSnakeFront.headBoundNode as SnakeNode;
	
	// Move snake tail to where back node is
	snakeSummary.snakeTail.boardSpaceNode = newSnakeFront.boardSpaceNode;
	
	// Move the new snake front to where the head currently is
	newSnakeFront.boardSpaceNode = snakeSummary.snakeHead.boardSpaceNode;

	// Move the head node one space further in the direction it is going
	const relation = findBoardRelation(
		oldSnakeFront.boardSpaceNode,
		snakeSummary.snakeHead.boardSpaceNode
	);
	snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeHead.boardSpaceNode, relation);


	// Connect new snakeBack to tail
	newSnakeBack.tailBoundNode = newSnakeFront.tailBoundNode;
	snakeSummary.snakeBack = newSnakeBack

	// Connect new snakeFront to front
	newSnakeFront.tailBoundNode = oldSnakeFront;
	newSnakeFront.headBoundNode = oldSnakeFront.headBoundNode;
	oldSnakeFront.headBoundNode = newSnakeFront;
	snakeSummary.snakeFront = newSnakeFront;

	// Redraw
	drawSnake();

}

window.tick = tick;


export function drawSnake() {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	// Loop over each snake node and draw it
	let currentSegment: SnakeEnd | SnakeNode = snakeSummary.snakeFront;
	while (!isSnakeEnd(currentSegment)) {

		drawSnakeSegment(currentSegment);

		currentSegment = currentSegment.tailBoundNode;
	}
}

// Type guard for drawSnake
function isSnakeEnd(node: SnakeNode | SnakeEnd): node is SnakeEnd {
	return node.isEnd === true;
}