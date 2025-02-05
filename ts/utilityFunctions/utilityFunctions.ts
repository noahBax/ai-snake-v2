import Apple from "../Board/apple.js";
import Expedition from "../Exploration/expedition.js";
import getPathFromExpedition from "../Exploration/getPathFromExpedition.js";
import getSnakeInstructions from "../Snake/getSnakeInstructions.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeNode } from "../snakeNodes.js";

export function direct(apple: Apple, frontSpace: BoardNode): number {
	return (apple.board_x - frontSpace.board_x) ** 2 + (apple.board_y - frontSpace.board_y) ** 2;
}

export function taxi(p1: Apple, p2: Apple): number {
	return Math.abs(p1.board_x - p2.board_x) + Math.abs(p1.board_y - p2.board_y);
}

// const turnPenaltyTable = 

export function stable(apple: Apple, frontSpace: BoardNode, backSpace: BoardNode, expedition: Expedition): number {
	const zigzag = taxi(apple, frontSpace) / 2;
	let turn_penalty = 0;

	const buffer: DIRECTION[] = [];
	// let directions = [...expedition.path];
	// directions.reverse();

	// if (directions.length < expedition.snake.length) {
	// 	let snakeInstructions = getSnakeInstructions(expedition.snake);
	// 	snakeInstructions = snakeInstructions.slice(directions.length - expedition.snake.length);
	// 	directions.push(...snakeInstructions);
	// }
	let directions = [...getSnakeInstructions(expedition.snake)];
	
	const distanceToBack = taxi(frontSpace, backSpace);
	const lengthBackImportance = lengthBackMultiplier(expedition.snake.length);
	
	// let last_dir = expedition.path[0];
	let straightCount = 0;
	let turnCounts = 0;

	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	let last_dir = expedition.snake.snakeFront.dirToTail;
	let i = 0;
	while (true) {
		const d = currentSegment.dirToTail;
		i++;

		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		currentSegment = currentSegment.tailBoundNode;

		// const d = directions[i];
		if (d == last_dir)
			straightCount++;
		else {
	
			// Update last_dir
			last_dir = d;
	
			// Up turn counts
			if (straightCount < 4)
				turnCounts++;
			
			const segmentPenalty = segmentLengthPenalty(straightCount);
			const distanceFromStartMultiplier = distanceFromStartPenalty(i - straightCount);
			const distanceFromAppleMultiplier = distanceToApplePenalty(direct(apple, currentSegment.boardSpaceNode));
	
			turn_penalty += segmentPenalty * distanceFromStartMultiplier// * distanceFromAppleMultiplier;
			// turn_penalty += segmentPenalty * distanceFromAppleMultiplier;
	
			// Reset straight count
			straightCount = 0;
			
			// // if (straightCount == 0 && base == 0)
			// // 	turn_penalty += 5000;
			// // else {
			// 	last_dir = d;
			// 	turnCounts++;
			// 	// turn_penalty += (expedition.snake.length - straightCount) * 2;
			// 	// turn_penalty += Math.sqrt((directions.length - straightCount) ** 2 / zigzag);
			// 	// break;
			// 	turn_penalty +=( (expedition.snake.length / straightCount) - 1) ** 2;
			// 	straightCount = 0;
			// // }
		}
	}

	// for (let i = 0; i < directions.length; i++) {
	// }
	// turn_penalty +=( (expedition.snake.length / straightCount) - 1) ** 2;
	// turn_penalty = turn_penalty;
	
	return turnCounts**1.3 + zigzag// - (1 - distanceToBack / expedition.snake.length);
}

function segmentLengthPenalty(x: number): number {
	return Math.max(0, -(1.3 ** x)+5.39063);
}
function distanceFromStartPenalty(x: number): number {
	return -(x) / (1 + x) + 1
}

function lengthBackMultiplier(length: number) {
	return length / (15 + length)
}
function distanceToApplePenalty(x: number): number {
	return -(1.04 ** x) + 2;
}