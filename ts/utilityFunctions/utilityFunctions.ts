import Apple from "../Board/apple.js";
import Expedition from "../Exploration/expedition.js";
import { BoardNode } from "../snakeNodes.js";

export function direct(apple: Apple, frontSpace: BoardNode): number {
	return (apple.board_x - frontSpace.board_x) ** 2 + (apple.board_y - frontSpace.board_y) ** 2;
}

export function taxi(apple: Apple, frontSpace: BoardNode): number {
	return Math.abs(apple.board_x - frontSpace.board_x) + Math.abs(apple.board_y - frontSpace.board_y);
}

export function stable(apple: Apple, frontSpace: BoardNode, expedition: Expedition): number {
	const base = Math.abs(apple.board_x - frontSpace.board_x) + Math.abs(apple.board_y - frontSpace.board_y)
	let turn_penalty = 0;
	let last_dir = expedition.path[0];
	for (const d in expedition.path) {
		if (expedition.path[d] != last_dir) {
			// turn_penalty += expedition.path.length / 5;
			turn_penalty += 1;
			last_dir = expedition.path[d];
		}
	}
	return base + turn_penalty;
}