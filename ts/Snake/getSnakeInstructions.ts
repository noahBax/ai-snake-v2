import { DIRECTION, isSnakeEnd, SnakeSummary } from "../snakeNodes.js";

export default function getSnakeInstructions(snakeSummary: SnakeSummary): DIRECTION[] {
	
	let currentSegment = snakeSummary.snakeFront;
	const ret: DIRECTION[] = [];

	while (true) {
		
		ret.push(currentSegment.dirToTail);

		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		currentSegment = currentSegment.tailBoundNode;
	}

	return ret;
}