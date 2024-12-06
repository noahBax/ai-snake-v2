import accessNodeRelation from "../Board/accessNodeRelation.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import { SnakeNode, SnakeSummary } from "../snakeNodes.js";

/**
 * The snake should only be incremented when it is about to eat an apple
 */
export default function moveSnake(snakeSummary: SnakeSummary): SnakeSummary {

	// Move the snake forward by 1. This works by making the current back of the
	// snake into the front of the snake. It is moved to where the current head
	// node is. The head node is moved forward 1 in the current heading. The
	// tail node is moved to the location where the back node used to be 
	
	const oldSnakeFront = snakeSummary.snakeFront;
	const newSnakeFront = snakeSummary.snakeBack;
	const newSnakeBack = newSnakeFront.headBoundNode as SnakeNode;
	
	// Move snake tail to where back node is
	snakeSummary.snakeTail.boardSpaceNode = newSnakeFront.boardSpaceNode;
	
	// Move the new snake front to where the head currently is
	newSnakeFront.boardSpaceNode = snakeSummary.snakeHead.boardSpaceNode;

	// Move the head node one space further in the direction it is going
	const relation = findBoardRelation(
		oldSnakeFront.boardSpaceNode,
		snakeSummary.snakeHead.boardSpaceNode
	);
	snakeSummary.snakeHead.boardSpaceNode = accessNodeRelation(snakeSummary.snakeHead.boardSpaceNode, relation);


	// Connect new snakeBack to tail
	newSnakeBack.tailBoundNode = newSnakeFront.tailBoundNode;
	snakeSummary.snakeBack = newSnakeBack

	// Connect new snakeFront to front
	newSnakeFront.tailBoundNode = oldSnakeFront;
	newSnakeFront.headBoundNode = oldSnakeFront.headBoundNode;
	oldSnakeFront.headBoundNode = newSnakeFront;
	snakeSummary.snakeFront = newSnakeFront;

	return snakeSummary;
}