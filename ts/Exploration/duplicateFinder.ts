import { BOARD_WIDTH } from "../preferences.js";
import { DIRECTION } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import getPathFromExpedition from "./getPathFromExpedition.js";

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
	let remainingMoves: DIRECTION[] = [];
	getPathFromExpedition(expedition, remainingMoves);
	remainingMoves = remainingMoves.slice(-expedition.snake.length);

	if (!duplicateBoard[boardIndex]) {
		duplicateBoard[boardIndex] = fillOutRemainingTree(remainingMoves);
		return false;
	}
	

	while (remainingMoves.length > 0) {
		const dir = remainingMoves.pop();
		if (!currentNode[dir]) {
			// Not a duplicate
			currentNode[dir] = fillOutRemainingTree(remainingMoves);
			return false;
		}
	}

	return true
}

function fillOutRemainingTree(steps: DIRECTION[]): CompassNode {

	const newNode = new CompassNode();

	if (steps.length == 0)
		return newNode;

	const dir = steps.pop();
	newNode[dir] = fillOutRemainingTree(steps);

	return newNode;
	
}

// export function maxPossibleApproaches

// export function allApproachesCovered(node: CompassNode, snakeLength: number): boolean {
	
// }