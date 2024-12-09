import accessNodeRelation from "../Board/accessNodeRelation.js";
import Apple from "../Board/apple.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import createSnakeCopy from "../Snake/createSnakeCopy.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import * as utility from "../utilityFunctions/utilityFunctions.js";

export default function exploreSnake(snakeSummary: SnakeSummary, apple: Apple): SnakeSummary {
	
	// Start exploring from the initial point
	let goalMet = false;
	let winner: SnakeSummary;
	const expeditions: Expedition[] = [];

	// Add in the 0-state
	expeditions.push({
		snake: snakeSummary,
		path: [],
		utility: Infinity
	})
	
	while (!goalMet) {
		
		// Take the highest man off the stack
		const bestPath = expeditions.reduce((a,b) => {if (a.utility < b.utility) {return a} else {return b}});
		expeditions.splice(expeditions.indexOf(bestPath), 1);
	}

	return winner;
}

function explore(expedition: Expedition, apple: Apple): Expedition[] {

	const front = expedition.snake.snakeFront.boardSpaceNode;
	
	// Check in all 4 directions to see if there is either
	// 1) A body part or 
	// 2) A head

	const checkSelf: BoardNode[] = [
		accessNodeRelation(front, DIRECTION.north),
		accessNodeRelation(front, DIRECTION.east),
		accessNodeRelation(front, DIRECTION.south),
		accessNodeRelation(front, DIRECTION.west),
	]

	// Check if any of them are the apple
	for (const n in checkSelf) {
		if (checkSelf[n].board_x == apple.board_x && checkSelf[n].board_y == apple.board_y) {
			// Found a path to the apple, return this
			return [stepTowards(expedition, checkSelf[n], apple)];
		}
	}

	// Now loop through the body and eliminate invalid directions
	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	while (checkSelf.length > 0) {

		// Remove direction possibly
		for (let n = 0; n < checkSelf.length; n++) {
			if (checkSelf[n].board_x == apple.board_x && checkSelf[n].board_y == apple.board_y) {
				checkSelf.splice(n);
				break;
			}
		}

		// Advance to next segment
		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		// Advance to next node
		currentSegment = currentSegment.tailBoundNode;
	}

	// The remaining directions are where we should explore
	const ret: Expedition[] = [];
	for (const n in checkSelf) {
		ret.push(stepTowards(expedition, checkSelf[n], apple));
	}

	return ret;
}

function stepTowards(expedition: Expedition, node: BoardNode, apple: Apple): Expedition {

	const snakeFront = expedition.snake.snakeFront.boardSpaceNode;
	
	// Amend path
	const relation = findBoardRelation(snakeFront, node);
	const path = [...expedition.path];
	path.push(relation);

	
	// Amend snake
	const snake = createSnakeCopy(expedition.snake);
	snake.snakeHead.boardSpaceNode = node;

	const u = utility.direct(apple, node);

	return {
		path: path,
		snake: snake,
		utility: u
	};
}