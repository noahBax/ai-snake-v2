import { SnakeNode, SnakeEnd, BoardNode } from "../snakeNodes.js";

export default function createSnake(boardNodes: BoardNode[], boardWidth: number, boardHeight: number): SnakeNode {
	
	// Default to the spot at 4,4
	const snakeHead: SnakeEnd = {
		boardSpaceNode: boardNodes[5 + 4 * boardWidth],
		isEnd: true
	}
	
	// Spot at 2,5
	const snakeTail: SnakeEnd = {
		boardSpaceNode: boardNodes[2 + 4 * boardWidth],
		isEnd: true
	}

	const snakeSegment1: SnakeNode = {
		headBoundNode: snakeHead,
		tailBoundNode: snakeHead,  // Temporary
		boardSpaceNode: boardNodes[4 + 4 * boardWidth],	// Spot at 3,4
		isEnd: false
	}
	const snakeSegment2: SnakeNode = {
		headBoundNode: snakeSegment1,
		tailBoundNode: snakeTail,
		boardSpaceNode: boardNodes[3 + 4 * boardWidth],	// Spot at 3,4
		isEnd: false
	}
	snakeSegment1.tailBoundNode = snakeSegment2;

	return snakeSegment1;
}