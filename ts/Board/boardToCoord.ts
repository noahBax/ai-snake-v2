import { NODE_SIZE } from "../DrawingTools/initDrawingTools.js";
import { BoardNode } from "../snakeNodes.js";

export default function boardToCoord(b: BoardNode): [number, number] {
	return [b.board_x * NODE_SIZE + NODE_SIZE / 2, b.board_y * NODE_SIZE + NODE_SIZE / 2];
}