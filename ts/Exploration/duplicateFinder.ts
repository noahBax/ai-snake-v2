import { BOARD_HEIGHT, BOARD_WIDTH } from "../preferences.js";
import getSnakeInstructions from "../Snake/getSnakeInstructions.js";
import { DIRECTION } from "../snakeNodes.js";
import Expedition from "./expedition.js";

export class CompassNode {

	dirs: [
		CompassNode | false,
		CompassNode | false,
		CompassNode | false,
		CompassNode | false,
	]

	constructor() {
		this.dirs = [false, false, false, false];
	}

}
	
/**
 * Augments the startNode and returns whether the current set of directions is a
 * duplicate set
 */
export function isDuplicate(duplicateBoard: CompassNode[], expedition: Expedition): boolean {

	const boardLoc = expedition.snake.snakeFront.boardSpaceNode;
	const boardIndex = boardLoc.board_y * BOARD_WIDTH + boardLoc.board_x;

	let currentNode = duplicateBoard[boardIndex];
	let snakeInstructions = getSnakeInstructions(expedition.snake);

	if (!duplicateBoard[boardIndex]) {
		duplicateBoard[boardIndex] = fillOutRemainingTree(snakeInstructions);
		return false;
	}	

	while (snakeInstructions.length > 0) {
		const dir = snakeInstructions.pop();
		if (!currentNode.dirs[dir]) {
			// Not a duplicate
			currentNode.dirs[dir] = fillOutRemainingTree(snakeInstructions);
			return false;
		}
		currentNode = currentNode.dirs[dir] as CompassNode;
	}

	// console.log('duped');
	return true
}

function fillOutRemainingTree(steps: DIRECTION[]): CompassNode {

	const newNode = new CompassNode();

	if (steps.length == 0)
		return newNode;

	const dir = steps.pop();
	newNode.dirs[dir] = fillOutRemainingTree(steps);

	return newNode;
	
}
