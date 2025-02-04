import { BoardNode } from "../snakeNodes.js";

export default function coordsEqual(c1: BoardNode, c2: BoardNode) {
	return c1.board_x == c2.board_x && c1.board_y == c2.board_y;
}