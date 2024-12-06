export enum DIRECTION {
	north,
	east,
	south,
	west,
}

export enum HEADING {
	up,
	right,
	down,
	left
}

export interface SnakeNode {

	isEnd: false;

	// How is it connected
	headBoundNode: SnakeNode | SnakeEnd;
	tailBoundNode: SnakeNode | SnakeEnd;

	boardSpaceNode: BoardNode;
}

/**
 * SnakeEnds are used to indicate the bounds of a snake. If you have reached a
 * SnakeEnd, stop iterating.
 *
 * SnakeEnds are used at the front to indicate the direction the snake is
 * facing.
 */
export interface SnakeEnd {
	isEnd: true;
	boardSpaceNode: BoardNode;
}

export interface BoardNode {

	// How do we get to other nodes
	readonly north: BoardNode;
	readonly south: BoardNode;
	readonly east: BoardNode;
	readonly west: BoardNode;

	// Snake information
	snakeSection?: SnakeNode;

	readonly board_x: number;
	readonly board_y: number;
}

export interface SnakeSummary {

	snakeFront: SnakeNode;
	snakeBack: SnakeNode;
	readonly snakeHead: SnakeEnd;
	readonly snakeTail: SnakeEnd;
	readonly boardNodes: BoardNode[];
	readonly boardWidth: number;
	readonly boardHeight: number;
}

// Type guard for snake ends because ts is a wimp
export function isSnakeEnd(node: SnakeNode | SnakeEnd): node is SnakeEnd {
	return node.isEnd === true;
}