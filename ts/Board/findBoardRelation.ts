import { BoardNode, DIRECTION } from "../snakeNodes.js";

// Determine the orientation that a node2 is to node1
export default function findBoardRelation(node1: BoardNode, node2: BoardNode): DIRECTION {

	if (node2 == node1.north)
		return DIRECTION.north;

	if (node2 == node1.east)
		return DIRECTION.east;

	if (node2 == node1.south)
		return DIRECTION.south;

	if (node2 == node1.west)
		return DIRECTION.west;

	console.error("Called findBoardRelation with two non-adjacent nodes");
}