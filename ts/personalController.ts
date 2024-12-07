import accessNodeRelation from "./Board/accessNodeRelation.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { DIRECTION, SnakeSummary } from "./snakeNodes.js";

export const keysBuffer: DIRECTION[] = [];

export function consumeKeyBuffer(snakeSummary: SnakeSummary): void {

	if (keysBuffer.length == 0)
		return;
	
	const snakeFrontNode = snakeSummary.snakeFront.boardSpaceNode;
	const currentHeading = findBoardRelation(snakeFrontNode, snakeSummary.snakeHead.boardSpaceNode);
	const key = keysBuffer.pop();
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
}

export function initController() {

	document.addEventListener('keydown', (event) => {

		// Don't process if the key is already down
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
		}
	});
	window.keysBuffer = keysBuffer;
}