import Expedition from "../expedition.js";

/**
 * The snake must of course has room to move his head after eating the apple
 */
export default function tailNotSnakeFrontNeighbor(e: Expedition): boolean {
	const front = e.snake.snakeFront.boardSpaceNode;
	const tail = e.snake.snakeTail.boardSpaceNode;
	console.log('Front:', front.board_x,front.board_y, 'Tail:', tail.board_x, tail.board_y, 'Length:', e.snake.length);
	const taxiDistance = Math.abs(front.board_x - tail.board_x) + Math.abs(front.board_y - tail.board_y);
	const tooShort = e.snake.length <= 4;

	if (tooShort)
		return true;

	if (taxiDistance <= 1)
		return false;

	return true;
}
