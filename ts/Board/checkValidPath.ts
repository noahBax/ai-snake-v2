import getSnakeBoardNodes from "../Snake/getSnakeBoardNodes.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeSummary } from "../snakeNodes.js";
import accessNodeRelation from "./accessNodeRelation.js";

export default function checkValidPath(snakeSummary: SnakeSummary): boolean {

	// Create a list of nodes that contain the snake
	const explored: BoardNode[] = getSnakeBoardNodes(snakeSummary);
	const snakeLength = getSnakeBoardNodes.length;

	// Check to see if you can the tail node
	const tail = snakeSummary.snakeTail.boardSpaceNode;

	const exploreMe: BoardNode[] = [];
	let startFrom = snakeSummary.snakeHead.boardSpaceNode;
	if (startFrom.board_x == -1)
		startFrom = snakeSummary.snakeFront.boardSpaceNode;
	exploreMe.push(startFrom);

	let foundGoal = false;

	while (exploreMe.length > 0) {

		const e = exploreMe.pop();

		// Return true if we have explored and found the tail
		if (e == tail)
			foundGoal = true;

		const expansions: BoardNode[] = [
			accessNodeRelation(e, DIRECTION.north),
			accessNodeRelation(e, DIRECTION.east),
			accessNodeRelation(e, DIRECTION.south),
			accessNodeRelation(e, DIRECTION.west),
		]

		for (const p in expansions) {

			const q = expansions[p];
			if (explored.includes(q))
				continue;
			
			explored.push(q);
			exploreMe.push(q);
		}
		
	}

	if (foundGoal && explored.length - snakeLength > 5)
		return true
	else
		return false
}