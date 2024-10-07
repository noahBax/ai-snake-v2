import { BoardNode, DIRECTION } from "../snakeNodes.js";

export default function accessNodeRelation(node: BoardNode, direction: DIRECTION): BoardNode {
	switch (direction) {
		case DIRECTION.north:
			return node.north;
		
		case DIRECTION.east:
			return node.east;
		
		case DIRECTION.south:
			return node.south;
		
		case DIRECTION.west:
			return node.west;

		default:
			console.error("Direction did not match");
	}
}