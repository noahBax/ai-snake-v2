import Apple from "../Board/apple.js";
import { BoardNode } from "../snakeNodes.js";

export function direct(apple: Apple, frontSpace: BoardNode): number {
	return (apple.board_x - frontSpace.board_x) ** 2 + (apple.board_y - frontSpace.board_y) ** 2;
}