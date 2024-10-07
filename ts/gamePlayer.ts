import accessNodeRelation from "./Board/accessNodeRelation.js";
import createBoard, { EMPTY_NODE } from "./Board/createBoard.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { clearGameCanvas } from "./DrawingTools/clearGameCanvas.js";
import { drawSnakeSegment } from "./DrawingTools/drawSnakeSegment.js";
import initDrawingTools from "./DrawingTools/initDrawingTools.js";
import createSnake from "./Snake/createSnake.js";
import { SnakeEnd, GameKit, BoardNode, SnakeNode } from "./snakeNodes.js";

var currentKit: GameKit;

const BOARD_WIDTH  = 20;
const BOARD_HEIGHT = 20;
const DRAW_NODE_SIZE = 20;

export function init() {

	const boardNodes: BoardNode[] = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
	const snake = createSnake(boardNodes, BOARD_WIDTH, BOARD_HEIGHT);

	console.log("Snakehead", snake)

	let snakeBack = snake;
	while(!isSnakeEnd(snakeBack.tailBoundNode))
		snakeBack = snakeBack.tailBoundNode;

	currentKit = {
		snakeFront: snake,
		snakeBack: snakeBack,
		boardNodes: boardNodes,
		boardWidth: BOARD_WIDTH,
		boardHeight: BOARD_HEIGHT
	}

	initDrawingTools(BOARD_WIDTH, BOARD_HEIGHT, DRAW_NODE_SIZE);

}

function tick() {

	// Check to see if head is in wall
	if (currentKit.snakeFront.headBoundNode.boardSpaceNode == EMPTY_NODE) {
		console.log('Game Over');
	}

	const snakeHead = currentKit.snakeFront.headBoundNode as SnakeEnd;
	const snakeTail = currentKit.snakeBack.tailBoundNode as SnakeEnd;

	const oldSnakeFront = currentKit.snakeFront as SnakeNode
	const newSnakeFront = currentKit.snakeBack as SnakeNode;
	const newSnakeBack = newSnakeFront.headBoundNode as SnakeNode;
	
	// Move snake tail to where back node is
	snakeTail.boardSpaceNode = newSnakeFront.boardSpaceNode;
	
	// Move the new snake front to where the head currently is
	newSnakeFront.boardSpaceNode = snakeHead.boardSpaceNode;

	// Move the head node one space further in the direction it is going
	const relation = findBoardRelation(
		oldSnakeFront.boardSpaceNode,
		snakeHead.boardSpaceNode
	);
	snakeHead.boardSpaceNode = accessNodeRelation(snakeHead.boardSpaceNode, relation);


	// Connect new snakeBack to tail
	newSnakeBack.tailBoundNode = newSnakeFront.tailBoundNode;
	currentKit.snakeBack = newSnakeBack

	// Connect new snakeFront to front
	newSnakeFront.tailBoundNode = oldSnakeFront;
	newSnakeFront.headBoundNode = oldSnakeFront.headBoundNode;
	oldSnakeFront.headBoundNode = newSnakeFront;
	currentKit.snakeFront = newSnakeFront;

	// Redraw
	drawSnake();

}

window.tick = tick;


export function drawSnake() {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	// Loop over each snake node and draw it
	let currentSegment: SnakeEnd | SnakeNode = currentKit.snakeFront;
	while (!isSnakeEnd(currentSegment)) {

		drawSnakeSegment(currentSegment);

		currentSegment = currentSegment.tailBoundNode;
	}
}

// Type guard for drawSnake
function isSnakeEnd(node: SnakeNode | SnakeEnd): node is SnakeEnd {
	return node.isEnd === true;
}