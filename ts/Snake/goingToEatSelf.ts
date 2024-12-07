import { isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";

export default function goingToEatSelf(snakeSummary: SnakeSummary): boolean {

	// Get location of head node
	const headSpace = snakeSummary.snakeHead.boardSpaceNode;

	// Iterate over the snake and check to see if any segment overlaps that
	let currentSegment = snakeSummary.snakeFront.tailBoundNode as SnakeNode;

	while (true) {
		
		let b = currentSegment.boardSpaceNode;
		if (b.board_x == headSpace.board_x && b.board_y == headSpace.board_y)
			return true;
		
		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		currentSegment = currentSegment.tailBoundNode;
	}

	return false;
}