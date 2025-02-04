import Expedition from "../expedition.js";

/**
 * The snake must of course has room to move his head after eating the apple
 */
export default function tailNotSnakeFrontNeighbor(e: Expedition): boolean {
	const front = e.snake.snakeFront.boardSpaceNode;
	const tail = e.snake.snakeTail.boardSpaceNode;
	const xDist = Math.abs(front.board_x - tail.board_x);
	const yDist = Math.abs(front.board_y - tail.board_y);
	const tooShort = e.snake.length <= 4;

	if (tooShort)
		return true;

	if (xDist <= 1 && yDist <= 1)
		return false;

	return true;
}
