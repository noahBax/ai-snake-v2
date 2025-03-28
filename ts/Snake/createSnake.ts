import accessNodeRelation from "../Board/accessNodeRelation.js";
import { incrementProgress } from "../performanceTracking.js";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../preferences.js";
import { SnakeNode, SnakeEnd, BoardNode, SnakeSummary, DIRECTION } from "../snakeNodes.js";

export default function createSnake(boardNodes: BoardNode[]): SnakeSummary {
	
	// Start at spot (5, 4)
	const seg0: BoardNode = boardNodes[5 + 4 * BOARD_WIDTH];
	const seg1: BoardNode = accessNodeRelation(seg0, DIRECTION.west);
	const seg2: BoardNode = accessNodeRelation(seg1, DIRECTION.west);
	const seg3: BoardNode = accessNodeRelation(seg2, DIRECTION.west);
	const seg4: BoardNode = accessNodeRelation(seg3, DIRECTION.west);
	
	const snakeHead: SnakeEnd = {
		boardSpaceNode: seg0,
		isEnd: true,
		dirToTail: DIRECTION.west,
	}
	
	const snakeTail: SnakeEnd = {
		boardSpaceNode: seg4,
		isEnd: true,
		dirToTail: DIRECTION.west,
	}

	const snakeFront: SnakeNode = {
		headBoundNode: snakeHead,
		tailBoundNode: snakeHead,  // Temporary
		boardSpaceNode: seg1,
		isEnd: false,
		dirToTail: DIRECTION.west,
	}
	const snakeMid: SnakeNode = {
		headBoundNode: snakeFront,
		tailBoundNode: snakeFront, // Temporary
		boardSpaceNode: seg2,
		isEnd: false,
		dirToTail: DIRECTION.west,
	}
	const snakeBack: SnakeNode = {
		headBoundNode: snakeMid,
		tailBoundNode: snakeTail,
		boardSpaceNode: seg3,
		isEnd: false,
		dirToTail: DIRECTION.west,
	}
	snakeFront.tailBoundNode = snakeMid;
	snakeMid.tailBoundNode = snakeBack

	// Start out the global progress counter correctly
	incrementProgress();
	incrementProgress();
	incrementProgress();

	return {
		length: 3,
		snakeFront: snakeFront,
		snakeBack: snakeBack,
		snakeHead: snakeHead,
		snakeTail: snakeTail,
		boardNodes: boardNodes,
		boardWidth: BOARD_WIDTH,
		boardHeight: BOARD_HEIGHT
	}

}