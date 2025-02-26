import getSnakeBoardNodes from "../Snake/getSnakeBoardNodes.js";
import { BoardNode, SnakeSummary } from "../snakeNodes.js";
import { EMPTY_NODE } from "./createBoard.js";

export default function findGroups(snakeSummary: SnakeSummary): BoardNode[][] {

	const groups: BoardNode[][] = [];
	const exploredNodes = getSnakeBoardNodes(snakeSummary);
	const toExplore = [...snakeSummary.boardNodes].filter(n => !exploredNodes.includes(n));

	// Loop until you've run out of nodes to explore
	while (toExplore.length > 0) {

		// Establish a unique ID for the group
		const gID = groups.length;
		// Group members
		const group: BoardNode[] = [];
		
		// Exploration stack
		const currentStack = [toExplore.pop()];
		exploredNodes.push(currentStack[0]);

		// While there are items in the stack we haven't explored
		while (currentStack.length > 0) {

			// Pop any guy off the stack
			const n = currentStack.pop();
			group.push(n);

			// Examine neighbors
			const neighbors = [n.north, n.east, n.south, n.west];
			for (const i of neighbors) {
				if (i != EMPTY_NODE && !exploredNodes.includes(i)) {
					currentStack.push(i);
					toExplore.splice(toExplore.indexOf(i), 1);
					exploredNodes.push(i);
				}
			}
		}

		groups.push(group);
	}
	
	return groups;
}