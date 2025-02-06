import getSnakeBoardNodes from "../Snake/getSnakeBoardNodes.js";
import { BoardNode, SnakeSummary } from "../snakeNodes.js";

export default function findGroups(snakeSummary: SnakeSummary) {

	const groups: BoardNode[][] = [];
	const exploredNodes = getSnakeBoardNodes(snakeSummary);
	const toExplore = [...snakeSummary.boardNodes].filter(n => !exploredNodes.includes(n));

	while (toExplore.length > 0) {

		const gID = groups.length;
		const group: BoardNode[] = [];
		
		const currentStack = [toExplore.pop()];

		while (currentStack.length > 0) {
			const n = currentStack.pop();

		}

		groups.push(group);
	}

	
	
}