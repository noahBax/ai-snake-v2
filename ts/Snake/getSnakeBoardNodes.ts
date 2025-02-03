import { BoardNode, isSnakeEnd, SnakeSummary } from "../snakeNodes.js";

export default function getSnakeBoardNodes(snakeSummary: SnakeSummary): BoardNode[] {

	const snakeNodes: BoardNode[] = [];
	let currentSegment = snakeSummary.snakeFront;
	
	while (true) {

		snakeNodes.push(currentSegment.boardSpaceNode);
		
		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		// Advance to next node
		currentSegment = currentSegment.tailBoundNode;
	}
	
	return snakeNodes;
}