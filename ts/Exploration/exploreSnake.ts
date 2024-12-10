import accessNodeRelation from "../Board/accessNodeRelation.js";
import Apple from "../Board/apple.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import createSnakeCopy from "../Snake/createSnakeCopy.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import * as utility from "../utilityFunctions/utilityFunctions.js";
import moveSnake from "../Snake/moveSnake.js";
import { EMPTY_NODE } from "../Board/createBoard.js";
import checkValidPath from "../Board/checkValidPath.js";

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
		// console.log('utility:', bestPath.utility);
		if (bestPath.atApple) {

			if (!checkValidPath(bestPath.snake))
				continue;
			
			winner = bestPath;
			goalMet = true;
			// console.log('Found great')
			break;
		}

		const pioneers = explore(bestPath, apple);
		// console.log('expeditions:', expeditions.length);
		// console.log('Results');
		for (const p in pioneers) {
			// console.log(p, ':', pioneers[p]);
			expeditions.push(pioneers[p]);
		}
		
	}

	// console.log(expeditions);

	return winner;
}

function explore(expedition: Expedition, apple: Apple): Expedition[] {

	const front = expedition.snake.snakeFront.boardSpaceNode;
	// console.log(`Exploring at ${front.board_x}, ${front.board_y}`);
	
	// Check in all 4 directions to see if there is either
	// 1) A body part or 
	// 2) A head

	const checkSelf: BoardNode[] = [
		accessNodeRelation(front, DIRECTION.north),
		accessNodeRelation(front, DIRECTION.east),
		accessNodeRelation(front, DIRECTION.south),
		accessNodeRelation(front, DIRECTION.west),
	]
	// console.log(`${checkSelf.length} neighbors`);

	// // Check if any of them are the apple
	// for (const n in checkSelf) {
	// 	if (checkSelf[n].board_x == apple.board_x && checkSelf[n].board_y == apple.board_y) {
	// 		// Found a path to the apple, return this
	// 		const f = stepTowards(expedition, checkSelf[n], apple);
	// 		f.atApple = true;
	// 		return [f];
	// 	}
	// }

	// Or empty node
	for (let n = 0; n < checkSelf.length; n++) {
		if (checkSelf[n] == EMPTY_NODE)
			checkSelf.splice(n, 1);
	}

	// Now loop through the body and eliminate invalid directions
	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	while (checkSelf.length > 0) {

		const space = currentSegment.boardSpaceNode;
		
		// Remove direction possibly
		for (let n = 0; n < checkSelf.length; n++) {
			// console.log('positions')
			// console.log(checkSelf[n].board_x, checkSelf[n].board_y);
			// console.log(space.board_x, space.board_y);
			if (checkSelf[n].board_x == space.board_x && checkSelf[n].board_y == space.board_y) {
				checkSelf.splice(n, 1);
				// console.log('Spot eliminated');
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

	let snake = createSnakeCopy(expedition.snake);
	const snakeFront = snake.snakeFront.boardSpaceNode;
	
	// Amend path
	// console.log('Finding relation between', snakeFront, 'and', node);
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