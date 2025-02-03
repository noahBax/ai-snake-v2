import accessNodeRelation from "../Board/accessNodeRelation.js";
import Apple from "../Board/apple.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import createSnakeCopy from "../Snake/createSnakeCopy.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import * as utility from "../utilityFunctions/utilityFunctions.js";
import moveSnake from "../Snake/moveSnake.js";
import { EMPTY_NODE } from "../Board/createBoard.js";
import frontCanSeeSnakeTail from "./Rules/frontCanSeeSnakeTail.js";

export default function exploreSnake(snakeSummary: SnakeSummary, apple: Apple): Expedition {
	
	// Start exploring from the initial point
	let goalMet = false;
	let winner: Expedition;
	const expeditions: Expedition[] = [];

	// Add in the 0-state
	const empty: Expedition = {
		snake: snakeSummary,
		path: [],
		utility: Infinity,
		atApple: false,
	}
	expeditions.push(empty);
	
	let limit = 20000;
	while (!goalMet && limit > 0) {
		limit--;
		
		if (expeditions.length == 0) {
			return empty;
		}
		
		// Take the highest man off the stack
		const bestPath = expeditions.reduce((a,b) => {if (a.utility < b.utility) {return a} else {return b}});
		expeditions.splice(expeditions.indexOf(bestPath), 1);

		// Check to see if the path with the best utility has reached the apple
		if (bestPath.atApple) {

			// Check to see that it passes all of the rules
			if (!checkMeetsRules(bestPath))
				continue;
			
			winner = bestPath;
			goalMet = true;
			break;
		}

		const pioneers = expandAtNode(bestPath, apple);
		for (const p in pioneers) {
			expeditions.push(pioneers[p]);
		}
		
	}

	return winner;
}

function expandAtNode(expedition: Expedition, apple: Apple): Expedition[] {

	const front = expedition.snake.snakeFront.boardSpaceNode;
	
	const possibleDirections: BoardNode[] = [
		accessNodeRelation(front, DIRECTION.north),
		accessNodeRelation(front, DIRECTION.east),
		accessNodeRelation(front, DIRECTION.south),
		accessNodeRelation(front, DIRECTION.west),
	];

	// Eliminate empty nodes
	for (let n = 0; n < possibleDirections.length; n++) {
		if (possibleDirections[n] == EMPTY_NODE)
			possibleDirections.splice(n, 1);
	}

	// Loop through every node in the body and eliminate a direction if it
	// overlaps
	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	while (possibleDirections.length > 0) {

		const bodySegmentSpot = currentSegment.boardSpaceNode;
		
		// Check each direction for overlap
		for (let n = 0; n < possibleDirections.length; n++) {

			const overlapX = possibleDirections[n].board_x == bodySegmentSpot.board_x;
			const overlapY = possibleDirections[n].board_y == bodySegmentSpot.board_y;

			if (overlapX && overlapY) {
				possibleDirections.splice(n, 1);
				break;
			}
		}

		// If this is the end of the snake, break out
		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		// Otherwise, advance to next node
		else
			currentSegment = currentSegment.tailBoundNode;
	}

	// The remaining directions are where we should explore
	const ret: Expedition[] = [];
	for (const n in possibleDirections) {
		ret.push(stepTowards(expedition, possibleDirections[n], apple));
	}

	return ret;
}

function stepTowards(expedition: Expedition, node: BoardNode, apple: Apple): Expedition {

	let snake = createSnakeCopy(expedition.snake);
	const snakeFront = snake.snakeFront.boardSpaceNode;
	
	// Amend path
	const relation = findBoardRelation(snakeFront, node);
	const path = [...expedition.path];
	path.push(relation);

	
	// Amend snake
	snake.snakeHead.boardSpaceNode = node;
	snake = moveSnake(snake);

	const u = utility.taxi(apple, node);

	const atApple = node.board_x == apple.board_x && node.board_y == apple.board_y;

	return {
		path: path,
		snake: snake,
		utility: u,
		atApple: atApple
	};
}

function checkMeetsRules(e: Expedition) {
	const rules: ((e: Expedition) => boolean)[] = [
		frontCanSeeSnakeTail
	];

	return rules.every( r => r(e));
}