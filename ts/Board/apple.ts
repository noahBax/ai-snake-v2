import { GAME_BOARD_CTX, NODE_SIZE } from "../DrawingTools/initDrawingTools.js";
import { SHEET } from "../sheet.js";
import { BoardNode, isSnakeEnd, SnakeSummary } from "../snakeNodes.js";

// export var APPLE: Apple = {
// 	board_x: 0,
// 	board_y: 0
// };

export default interface Apple {
	board_x: number;
	board_y: number;
}

/**
 * Spawn an apple on a node not in the snake
 * @param snakeSummary Summary of the snake to avoid
 * @param apple The apple to relocate
 * @param antiApple An optional apple to avoid placing over
 */
export function spawnApple(snakeSummary: SnakeSummary, apple: Apple, antiApple?: Apple) {

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

	if (candidates.length == 0) {
		console.log('Finished');
		apple.board_x = -1
		apple.board_y = -1
		return;
	}

	// Pick one of the candidates at random
	let bigApple = Math.floor(Math.random() * candidates.length);

	// If there is an apple that we shouldn't place over, pick over that
	if (antiApple && antiApple.board_x == candidates[bigApple].board_x && antiApple.board_y == candidates[bigApple].board_y) {
		bigApple = bigApple + 1 % candidates.length;
	}

	// Set the properties of APPLE
	apple.board_x = candidates[bigApple].board_x;
	apple.board_y = candidates[bigApple].board_y;
}

export function goingToEatApple(snakeSummary: SnakeSummary, apple: Apple): boolean {
	const head = snakeSummary.snakeHead.boardSpaceNode;
	return head.board_x == apple.board_x && head.board_y == apple.board_y;
}