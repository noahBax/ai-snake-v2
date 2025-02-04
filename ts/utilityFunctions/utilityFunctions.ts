import Apple from "../Board/apple.js";
import Expedition from "../Exploration/expedition.js";
import getPathFromExpedition from "../Exploration/getPathFromExpedition.js";
import getSnakeInstructions from "../Snake/getSnakeInstructions.js";
import { BoardNode, DIRECTION } from "../snakeNodes.js";

export function direct(apple: Apple, frontSpace: BoardNode): number {
	return (apple.board_x - frontSpace.board_x) ** 2 + (apple.board_y - frontSpace.board_y) ** 2;
}

export function taxi(apple: Apple, frontSpace: BoardNode): number {
	return Math.abs(apple.board_x - frontSpace.board_x) + Math.abs(apple.board_y - frontSpace.board_y);
}

export function stable(apple: Apple, frontSpace: BoardNode, expedition: Expedition): number {
	const base = taxi(apple, frontSpace);
	let turn_penalty = 0;

	const buffer: DIRECTION[] = [];
	let directions = [...expedition.path];
	directions.reverse();

	if (directions.length < expedition.snake.length) {
		let snakeInstructions = getSnakeInstructions(expedition.snake);
		snakeInstructions = snakeInstructions.slice(directions.length - expedition.snake.length);
		directions.push(...snakeInstructions);
	}
	
	
	let last_dir = expedition.path[0];
	let straightCount = 0;
	let turnCounts = 0;

	for (const d of directions) {
		if (d == last_dir)
			straightCount++;
		else {
			last_dir = d;
			turnCounts++;
			turn_penalty += (expedition.snake.length - straightCount) * 2;
			// break;
			// turn_penalty +=( (expedition.snake.length / straightCount) - 1) ** 2;
			straightCount = 0;
		}
	}
	// turn_penalty +=( (expedition.snake.length / straightCount) - 1) ** 2;
	// turn_penalty = turn_penalty;
	
	return base + turn_penalty;
}