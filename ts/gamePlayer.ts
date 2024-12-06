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

	GAME_LOOP = setInterval(tick, 250);

}

function tick() {

	// Check to see if head is in wall
	if (snakeSummary.snakeHead.boardSpaceNode == EMPTY_NODE) {
		console.log('Game Over');
		clearInterval(GAME_LOOP);
		return;
	}

	// Move the snake forward by 1. This works by making the current back of the
	// snake into the front of the snake. It is moved to where the current head
	// node is. The head node is moved forward 1 in the current heading. The
	// tail node is moved to the location where the back node used to be 
	
	const oldSnakeFront = snakeSummary.snakeFront;
	const newSnakeFront = snakeSummary.snakeBack;
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
}

// Type guard for drawSnake
function isSnakeEnd(node: SnakeNode | SnakeEnd): node is SnakeEnd {
	return node.isEnd === true;
}