import accessNodeRelation from "../Board/accessNodeRelation.js";
import Apple from "../Board/apple.js";
import { EMPTY_NODE } from "../Board/createBoard.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import createSnakeCopy from "../Snake/createSnakeCopy.js";
import moveSnake from "../Snake/moveSnake.js";
import { BoardNode, DIRECTION, SnakeNode, isSnakeEnd } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import { CompassNode, isDuplicate } from "./duplicateFinder.js";
import { shuffle } from "../randomizer.js";


export default function expandAtNode(expedition: Expedition, apple: Apple, duplicateBoard?: CompassNode[]): Expedition[] {

	const front = expedition.snake.snakeFront.boardSpaceNode;
	const back = expedition.snake.snakeBack.boardSpaceNode;
	
	const possibleSpots: BoardNode[] = [
		accessNodeRelation(front, DIRECTION.north),
		accessNodeRelation(front, DIRECTION.east),
		accessNodeRelation(front, DIRECTION.south),
		accessNodeRelation(front, DIRECTION.west),
	];

	shuffle(possibleSpots);

	const validDirections = possibleSpots.filter(d => d != EMPTY_NODE);

	let currentSegment = expedition.snake.snakeFront.tailBoundNode as SnakeNode;
	while (validDirections.length > 0) {

		
		const bodySegmentSpot = currentSegment.boardSpaceNode;

		// If this is the end of the snake, break out
		if (isSnakeEnd(currentSegment.tailBoundNode)) {
			break;
		}
		
		// Check each direction for overlap
		for (let n = 0; n < validDirections.length; n++) {
			
			const overlapX = validDirections[n].board_x == bodySegmentSpot.board_x;
			const overlapY = validDirections[n].board_y == bodySegmentSpot.board_y;
			
			if (overlapX && overlapY) {
				validDirections.splice(n, 1);
				break;
			}
		}
		
		currentSegment = currentSegment.tailBoundNode;
	}

	// The remaining directions are where we should explore
	const validExpeditions: Expedition[] = [];
	for (const v of validDirections) {
		validExpeditions.push(stepTowards(expedition, v, back, apple));
	}

	// Check for duplicates
	const ret: Expedition[] = [];
	for (const e of validExpeditions) {
		if (!duplicateBoard || !isDuplicate(duplicateBoard, e))
			ret.push(e);

	}

	return ret;
}

function stepTowards(expedition: Expedition, frontNode: BoardNode, backNode: BoardNode, apple: Apple): Expedition {

	let snake = createSnakeCopy(expedition.snake);
	const snakeFront = snake.snakeFront.boardSpaceNode;
	
	// Amend path
	const relation = findBoardRelation(snakeFront, frontNode);
	const path = [...expedition.path];
	path.push(relation);
	
	// Amend snake
	snake.snakeHead.boardSpaceNode = frontNode;
	snake = moveSnake(snake);

	const atApple = frontNode.board_x == apple.board_x && frontNode.board_y == apple.board_y;

	return {
		path: path,
		snake: snake,
		utility: 0,
		atApple: atApple,
		age: expedition.age+1
	};
}
