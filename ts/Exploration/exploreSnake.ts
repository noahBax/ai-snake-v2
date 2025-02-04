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
import tailNotSnakeFrontNeighbor from "./Rules/tailNotSnakeFrontNeighbor.js";
import { snakeDrawBuffer } from "../DrawingTools/snakeDrawBuffer.js";
import { isDuplicate, CompassNode } from "./duplicateFinder.js";
import { upperIndex } from "../DrawingTools/frameManager.js";

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

	const duplicateBoard = [];
	
	let limit = 50000;
	while (!goalMet && limit > 0) {
		limit--;
		
		if (expeditions.length == 0) {
			return empty;
		}
		
		// Take the highest man off the stack
		const bestPath = expeditions.reduce((a,b) => {if (a.utility < b.utility) {return a} else {return b}});
		expeditions.splice(expeditions.indexOf(bestPath), 1);

		findBoardRelation(bestPath.snake.snakeFront.boardSpaceNode, bestPath.snake.snakeFront.tailBoundNode.boardSpaceNode);

		// Check to see if it is a duplicate
		if (isDuplicate(duplicateBoard, bestPath)) {
			console.log('duped');
			continue;
		}

		// if (!isDuplicate(duplicateBoard, bestPath)) {
		// 	console.error('BEEP');
		// 	return;
		// }

		upperIndex();
		snakeDrawBuffer.push([bestPath.snake, {...apple}, -1]);
		
		// Check to see if the path with the best utility has reached the apple
		if (bestPath.atApple) {


			// Check to see that it passes all of the rules
			const ruleBroken = checkMeetsRules(bestPath);
			if (ruleBroken > 0) {
				// snakeDrawBuffer.push([bestPath.snake, {...apple}, ruleBroken]);
				console.log('Fail');
				continue;
			}

			console.log(bestPath.path);
			
			winner = bestPath;
			goalMet = true;
			break;
		}

		const pioneers = expandAtNode(bestPath, apple);
		expeditions.push(...pioneers);
		
	}

	return winner;
}

function expandAtNode(expedition: Expedition, apple: Apple): Expedition[] {

	const front = expedition.snake.snakeFront.boardSpaceNode;
	
	const possibleSpots: BoardNode[] = [
		accessNodeRelation(front, DIRECTION.north),
		accessNodeRelation(front, DIRECTION.east),
		accessNodeRelation(front, DIRECTION.south),
		accessNodeRelation(front, DIRECTION.west),
	];

	const validDirections = possibleSpots.filter(d => d != EMPTY_NODE);

	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	while (validDirections.length > 0) {

		
		const bodySegmentSpot = currentSegment.boardSpaceNode;

		// If this is the end of the snake, break out
		if (isSnakeEnd(currentSegment.tailBoundNode)) {
			break;
		}
		
		// Check each direction for overlap
		for (let n = 0; n < validDirections.length; n++) {
			
			const overlapX = validDirections[n].board_x == bodySegmentSpot.board_x;
			const overlapY = validDirections[n].board_y == bodySegmentSpot.board_y;
			
			if (overlapX && overlapY) {
				validDirections.splice(n, 1);
				break;
			}
		}
		
		currentSegment = currentSegment.tailBoundNode;
	}

	// The remaining directions are where we should explore
	const ret: Expedition[] = [];
	for (const n in validDirections) {
		ret.push(stepTowards(expedition, validDirections[n], apple));
	}

	return ret;
}

function stepTowards(expedition: Expedition, node: BoardNode, apple: Apple): Expedition {

	// console.log('Stepping towards');

	let snake = createSnakeCopy(expedition.snake);
	const snakeFront = snake.snakeFront.boardSpaceNode;
	
	// Amend path
	const relation = findBoardRelation(snakeFront, node);
	const path = [...expedition.path];
	path.push(relation);

	// console.log(`Stepping from ${snakeFront.board_x}, ${snakeFront.board_y} to ${node.board_x}, ${node.board_y}`);

	
	// Amend snake
	snake.snakeHead.boardSpaceNode = node;
	snake = moveSnake(snake);

	// const u = utility.taxi(apple, node);
	const u = utility.stable(apple, node, expedition);
	// const u = utility.direct(apple, node);

	const atApple = node.board_x == apple.board_x && node.board_y == apple.board_y;

	return {
		path: path,
		snake: snake,
		utility: u,
		atApple: atApple
	};
}

function checkMeetsRules(e: Expedition): number {
	const rules: ((e: Expedition) => boolean)[] = [
		frontCanSeeSnakeTail,
		// tailNotSnakeFrontNeighbor,
	];

	for (let r = 0; r < rules.length; r++) {
		if (!rules[r](e)) {
			return r+1;
		}
	}

	return 0;
	// return rules.every( r => r(e));
}