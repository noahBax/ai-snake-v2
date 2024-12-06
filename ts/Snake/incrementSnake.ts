import accessNodeRelation from "../Board/accessNodeRelation.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import { SnakeNode, SnakeSummary } from "../snakeNodes.js";

/**
 * The snake should only be incremented when it is about to eat an apple
 */
export default function incrementSnake(snakeSummary: SnakeSummary): SnakeSummary {

	// Create a new snake segment at the spot where the head currently is and advance the head
	const oldSnakeFront = snakeSummary.snakeFront;
	const newSegment: SnakeNode = {
		boardSpaceNode: snakeSummary.snakeHead.boardSpaceNode,
		headBoundNode: snakeSummary.snakeHead,
		tailBoundNode: snakeSummary.snakeFront,
		isEnd: false
	}
	snakeSummary.snakeFront.headBoundNode = newSegment;
	snakeSummary.snakeFront = newSegment;
	
	// Move the head node one space further in the direction it is going
	const relation = findBoardRelation(
		oldSnakeFront.boardSpaceNode,
		snakeSummary.snakeHead.boardSpaceNode
	);
	snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeHead.boardSpaceNode, relation);

	return snakeSummary;
}