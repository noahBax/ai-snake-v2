import { BoardNode } from "../snakeNodes.js";

export var EMPTY_NODE: BoardNode = {
	get north() { return this },
	get south() { return this },
	get east() { return this },
	get west() { return this },
	board_x: -1,
	board_y: -1,
};
window.emptyNode = EMPTY_NODE;

export default function createBoard(width: number, height: number): BoardNode[] {

	let ret: EditableBoardNode[] = [];

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {

			let n: EditableBoardNode = {
				north: EMPTY_NODE,
				south: EMPTY_NODE,
				east: EMPTY_NODE,
				west: EMPTY_NODE,
				board_x: j,
				board_y: i
			}

			// If there is a node before this one in the row, point
			if (j != 0) {
				n.west = ret[ret.length-1];
				ret[ret.length-1].east = n;
			}

			// If there is a node above this one in the column, point
			if (i != 0) {
				n.north = ret[(i-1)*width + j];
				ret[(i-1)*width + j].south = n;
			}

			ret.push(n);
		}
	}
	
	return ret;
}

interface EditableBoardNode {

	// How do we get to other nodes
	north: EditableBoardNode;
	south: EditableBoardNode;
	east: EditableBoardNode;
	west: EditableBoardNode;

	board_x: number;
	board_y: number;
}