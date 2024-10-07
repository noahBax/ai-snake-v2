import { SnakeNode } from "../snakeNodes.js";
import { GAME_BOARD_CTX, NODE_SIZE } from "./initDrawingTools.js";

export function drawSnakeSegment(node: SnakeNode) {

	// Draw Snake Red
	GAME_BOARD_CTX.fillStyle = "#F00";	

	const drawX = node.boardSpaceNode.board_x;
	const drawY = node.boardSpaceNode.board_y;

	GAME_BOARD_CTX.fillRect(
		drawX * NODE_SIZE,
		drawY * NODE_SIZE,
		NODE_SIZE,
		NODE_SIZE
	);
}