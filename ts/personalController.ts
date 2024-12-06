import accessNodeRelation from "./Board/accessNodeRelation.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { snakeSummary } from "./gamePlayer.js";
import { DIRECTION } from "./snakeNodes.js";

export function initController() {

	document.addEventListener('keydown', (event) => {

		// Don't process if the key is already down
		if (event.repeat)
			return;
		
		const snakeFrontNode = snakeSummary.snakeFront.boardSpaceNode;
		const currentHeading = findBoardRelation(snakeFrontNode, snakeSummary.snakeHead.boardSpaceNode);

		switch (event.key) {
			case "ArrowUp":
				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, DIRECTION.north);
				break;

			case "ArrowRight":
				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, DIRECTION.east);
				break;

			case "ArrowDown":
				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, DIRECTION.south);
				break;

			case "ArrowLeft":
				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeFrontNode, DIRECTION.west);
				break;
		}
	});
}