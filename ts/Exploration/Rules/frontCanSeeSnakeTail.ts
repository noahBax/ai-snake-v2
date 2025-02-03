import accessNodeRelation from "../../Board/accessNodeRelation.js";
import getSnakeBoardNodes from "../../Snake/getSnakeBoardNodes.js";
import { BoardNode, DIRECTION } from "../../snakeNodes.js";
import Expedition from "../expedition.js";

/**
 * In order that a snake could kind-of represent a Hamiltonian cycle, we need
 * the head to physically be able to access where the next segment will be
 * added. What this really does is allow the snake to circle back around if it
 * needs to
 */
export default function frontCanSeeSnakeTail(e: Expedition): boolean {

	// A list of already explored nodes
	// Populate it with the snake nodes
	const explored: BoardNode[] = getSnakeBoardNodes(e.snake);
	
	// Explore from the front...
	const startNode: BoardNode = e.snake.snakeFront.boardSpaceNode;
	// Try to find the back...
	const endNode: BoardNode = e.snake.snakeTail.boardSpaceNode;

	// List of nodes to explore
	const toExplore: BoardNode[] = [startNode];

	let foundEndNode = false;

	while (toExplore.length > 0) {

		const n = toExplore.pop();

		// If we can see the endNode, exit
		if (n == endNode) {
			foundEndNode = true;
			break;
		}

		const expansions: BoardNode[] = [
			accessNodeRelation(n, DIRECTION.north),
			accessNodeRelation(n, DIRECTION.east),
			accessNodeRelation(n, DIRECTION.south),
			accessNodeRelation(n, DIRECTION.west),
		];

		for (const p of expansions) {

			if (explored.includes(p))
				continue;
			else {
				explored.push(p);
				toExplore.push(p);
			}
		}
		
	}

	return foundEndNode;
}