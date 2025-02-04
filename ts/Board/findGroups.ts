import getSnakeBoardNodes from "../Snake/getSnakeBoardNodes.js";
import { BoardNode, SnakeSummary } from "../snakeNodes.js";

export default function findGroups(boardNodes: BoardNode[], snakeSummary: SnakeSummary) {

	const groups: number[] = [];
	const exploredNodes = getSnakeBoardNodes(snakeSummary);
	const toExplore = [...snakeSummary.boardNodes].filter(n => !exploredNodes.includes(n));

	while (toExplore.length > 0) {

		const gID = groups.length;
	}

	
	
}