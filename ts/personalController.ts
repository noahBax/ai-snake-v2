import accessNodeRelation from "./Board/accessNodeRelation.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { currentKit } from "./gamePlayer.js";
import { DIRECTION } from "./snakeNodes.js";

export function initController() {

	document.addEventListener('keydown', (event) => {

		// Don't process if the key is already down
		if (event.repeat)
			return;
		
		console.log(event.key);

		const currentHeading = findBoardRelation(currentKit.snakeFront.boardSpaceNode, currentKit.snakeHead.boardSpaceNode);

		switch (event.key) {
			case "ArrowUp":

				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;
				
				currentKit.snakeHead.boardSpaceNode = accessNodeRelation(currentKit.snakeFront.boardSpaceNode, DIRECTION.north);

				
			case "ArrowRight":

				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;
				
				currentKit.snakeHead.boardSpaceNode = accessNodeRelation(currentKit.snakeFront.boardSpaceNode, DIRECTION.east);

				
			case "ArrowDown":

				if (currentHeading == DIRECTION.north || currentHeading == DIRECTION.south)
					return;
				
				currentKit.snakeHead.boardSpaceNode = accessNodeRelation(currentKit.snakeFront.boardSpaceNode, DIRECTION.south);

				
			case "ArrowLeft":

				if (currentHeading == DIRECTION.east || currentHeading == DIRECTION.west)
					return;
				
				currentKit.snakeHead.boardSpaceNode = accessNodeRelation(currentKit.snakeFront.boardSpaceNode, DIRECTION.west);

		}
	});
}