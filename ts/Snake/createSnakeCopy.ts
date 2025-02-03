import { isSnakeEnd, SnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";

export default function createSnakeCopy(snakeSummary: SnakeSummary): SnakeSummary {

	const snakeHead: SnakeEnd = {
		boardSpaceNode: snakeSummary.snakeHead.boardSpaceNode,
		isEnd: true
	}
	const snakeTail: SnakeEnd = {
		boardSpaceNode: snakeSummary.snakeTail.boardSpaceNode,
		isEnd: true
	}

	const snakeFront: SnakeNode = {
		boardSpaceNode: snakeSummary.snakeFront.boardSpaceNode,
		headBoundNode: snakeHead,
		tailBoundNode: snakeTail,
		isEnd: false
	}
	let snakeBack = snakeFront;

	// Iterate over the snake and check to see if any segment overlaps that
	let currentSegment = snakeSummary.snakeFront.tailBoundNode as SnakeNode;

	while (true) {

		const newNode: SnakeNode = {
			boardSpaceNode: currentSegment.boardSpaceNode,
			headBoundNode: snakeHead,
			tailBoundNode: snakeTail,
			isEnd: false
		}
		
		// Link it into the current snake
		linkNode(snakeBack, snakeTail, newNode);

		// Point snakeBack to the new node
		snakeBack = newNode;
		
		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		// Advance to next node
		currentSegment = currentSegment.tailBoundNode;
	}

	return {
		length: snakeSummary.length,
		snakeFront: snakeFront,
		snakeBack: snakeBack,
		snakeHead: snakeHead,
		snakeTail: snakeTail,
		boardNodes: snakeSummary.boardNodes,
		boardHeight: snakeSummary.boardHeight,
		boardWidth: snakeSummary.boardWidth,
	}

}

function linkNode(front_facing: SnakeNode, tailNode: SnakeEnd, node: SnakeNode): void {

	front_facing.tailBoundNode = node;
	node.headBoundNode = front_facing;
	node.tailBoundNode = tailNode;
}