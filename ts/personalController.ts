import accessNodeRelation from "./Board/accessNodeRelation.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { snakeSummary } from "./gamePlayer.js";
import { DIRECTION } from "./snakeNodes.js";

export function initController() {

	document.addEventListener('keydown', (event) => {

		// Don't process if the key is already down
		if (event.repeat)
			return;
		
		const currentHeading = findBoardRelation(snakeSummary.snakeFront.boardSpaceNode, snakeSummary.snakeHead.boardSpaceNode);

		switch (event.key) {
			case "ArrowUp":

				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;
				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeFront.boardSpaceNode, DIRECTION.north);


			case "ArrowRight":

				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;
				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeFront.boardSpaceNode, DIRECTION.east);


			case "ArrowDown":

				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;
				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeFront.boardSpaceNode, DIRECTION.south);


			case "ArrowLeft":

				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;
				
				snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeFront.boardSpaceNode, DIRECTION.west);

		}
	});
}