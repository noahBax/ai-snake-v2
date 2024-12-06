import { BoardNode } from "../snakeNodes.js";
import { GAME_BOARD_CTX, NODE_SIZE } from "./initDrawingTools.js";

const SNAKE_RED = "#F00";

export function drawSnakeSegment(node: {boardSpaceNode: BoardNode}, color=SNAKE_RED) {

	// Draw Snake Red
	GAME_BOARD_CTX.fillStyle = color;

	const drawX = node.boardSpaceNode.board_x;
	const drawY = node.boardSpaceNode.board_y;

	GAME_BOARD_CTX.fillRect(
		drawX * NODE_SIZE,
		drawY * NODE_SIZE,
		NODE_SIZE,
		NODE_SIZE
	);
}