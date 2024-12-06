import { GAME_BOARD_CTX, NODE_SIZE } from "../DrawingTools/initDrawingTools.js";
import { BoardNode, isSnakeEnd, SnakeSummary } from "../snakeNodes.js";

export var APPLE: Apple = {
	board_x: 0,
	board_y: 0
};

export default interface Apple {
	board_x: number;
	board_y: number;
}

/**
 * Spawn an apple on a node not in the snake
 */
export function spawnApple(snakeSummary: SnakeSummary) {

	// The list of board nodes are all candidates for the location of the next
	// apple. First compile a blacklist containing nodes that are in the snake
	// and then go through and remove all blacklisted nodes from the candidates
	// list.

	const candidates: BoardNode[] = [];
	const blacklist: BoardNode[] = [];

	let currSnake = snakeSummary.snakeFront;
	while (true) {

		blacklist.push(currSnake.boardSpaceNode);

		if (isSnakeEnd(currSnake.tailBoundNode))
			break;
		currSnake = currSnake.tailBoundNode;
	}

	// Now go though the candidates and remove blacklisted nodes

	for (const i in snakeSummary.boardNodes) {
		const n = snakeSummary.boardNodes[i];

		let matches = blacklist.some( b => n.board_x == b.board_x && n.board_y == b.board_y);

		// Add it only if it doesn't match
		if (!matches)
			candidates.push(n);


	}
	
	// Pick one of the candidates at random
	const bigApple = Math.floor(Math.random() * candidates.length);

	// Set the properties of APPLE
	APPLE.board_x = candidates[bigApple].board_x;
	APPLE.board_y = candidates[bigApple].board_y;
}

export function drawApple() {
	GAME_BOARD_CTX.fillStyle = "#0F0";

	const drawX = APPLE.board_x;
	const drawY = APPLE.board_y;

	GAME_BOARD_CTX.fillRect(
		drawX * NODE_SIZE,
		drawY * NODE_SIZE,
		NODE_SIZE,
		NODE_SIZE
	);
}

export function goingToEatApple(snakeSummary: SnakeSummary): boolean {
	const head = snakeSummary.snakeHead.boardSpaceNode;
	return head.board_x == APPLE.board_x && head.board_y == APPLE.board_y;
}