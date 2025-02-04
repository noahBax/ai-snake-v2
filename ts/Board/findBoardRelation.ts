import { BoardNode, DIRECTION } from "../snakeNodes.js";

// Determine the orientation that a node2 is to node1
export default function findBoardRelation(travelFrom: BoardNode, toNode: BoardNode): DIRECTION {

	if (toNode == travelFrom.north)
		return DIRECTION.north;

	if (toNode == travelFrom.east)
		return DIRECTION.east;

	if (toNode == travelFrom.south)
		return DIRECTION.south;

	if (toNode == travelFrom.west)
		return DIRECTION.west;

	console.error("Called findBoardRelation with two non-adjacent nodes");
}