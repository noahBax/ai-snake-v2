import accessNodeRelation from "./Board/accessNodeRelation.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { unlock_tick } from "./DrawingTools/frameLocks.js";
import { lowerIndex, upperIndex } from "./DrawingTools/frameManager.js";
import { DIRECTION, SnakeSummary } from "./snakeNodes.js";

export const keysBuffer: DIRECTION[] = [];

export function consumeKeyBuffer(snakeSummary: SnakeSummary): void {

	if (keysBuffer.length == 0)
		return;
	
	// const snakeFrontNode = snakeSummary.snakeFront.boardSpaceNode;
	// const currentHeading = findBoardRelation(snakeFrontNode, snakeSummary.snakeHead.boardSpaceNode);
	// const key = keysBuffer.pop();
	// console.log('Consumed key:', key);
	// snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, key);
	// let valid = false;

	// switch (key) {
	// 	case DIRECTION.north:
	// 	case DIRECTION.south:
	// 		valid = currentHeading == DIRECTION.east || currentHeading == DIRECTION.west;
	// 		break;
			
	// 	case DIRECTION.east:
	// 	case DIRECTION.west:
	// 		valid = currentHeading == DIRECTION.north || currentHeading == DIRECTION.south;
	// 		break;
	// }

	// if (valid)
	// 	snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, key);
	// // else
	// // 	console.error(`INVALID MOVE. Cannot go from ${currentHeading} to ${key}`);
	const snakeFrontNode = snakeSummary.snakeFront.boardSpaceNode;
	const snakeNeckNode = snakeSummary.snakeFront.tailBoundNode.boardSpaceNode;
	const currentHeading = findBoardRelation(snakeNeckNode, snakeFrontNode);
	const key = keysBuffer.pop();
	// console.log('Consumed key:', key);
	// snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, key);
	let valid = false;

	switch (key) {
		case DIRECTION.north:
		case DIRECTION.south:
			valid = currentHeading == DIRECTION.east || currentHeading == DIRECTION.west;
			break;
			
		case DIRECTION.east:
		case DIRECTION.west:
			valid = currentHeading == DIRECTION.north || currentHeading == DIRECTION.south;
			break;
	}

	if (valid)
		snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, key);
	// else
	// 	console.error(`INVALID MOVE. Cannot go from ${currentHeading} to ${key}`);
}

export function initController() {

	document.addEventListener('keydown', (event) => {

		// Don't process if the key is already down

		if (event.key == "a")
			lowerIndex();
		else if (event.key == "d")
			upperIndex();
		
		if (event.repeat)
			return;
		switch (event.key) {
			case "ArrowUp":
				keysBuffer.unshift(DIRECTION.north);
				break;

			case "ArrowRight":
				keysBuffer.unshift(DIRECTION.east);
				break;

			case "ArrowDown":
				keysBuffer.unshift(DIRECTION.south);
				break;

			case "ArrowLeft":
				keysBuffer.unshift(DIRECTION.west);
				break;

			case " ":
				unlock_tick();
				console.log('unlocksing');
				break;
			
		}
	});
	window.keysBuffer = keysBuffer;
}