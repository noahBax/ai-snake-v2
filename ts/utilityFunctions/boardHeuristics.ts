import Apple from "../Board/apple.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../preferences.js";
import { BoardNode, GridSpot, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";

abstract class InteractiveGrid {
	abstract getValue(boardNode: GridSpot): number;
}

export class AvoidanceGrid extends InteractiveGrid {
	nodeHistory: number[];
	
	constructor() {
		super();
		this.nodeHistory = createEmptyGrid();
	}

	visitNode(gridSpot: GridSpot, penalty=1): void {
		const index = getIndex(gridSpot);

		if (!this.nodeHistory[index])
			this.nodeHistory[index] = penalty;
		else
			this.nodeHistory[index] += penalty;
	}

	getValue(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeHistory[index];
	}

	coolDown(amt=0.02): void {

		for (let i = 0; i < this.nodeHistory.length; i++)
			this.nodeHistory[i] -= amt;	

	}
}

export class SnakePathGrid extends InteractiveGrid {

	nodeBonuses: number[];

	constructor(snakeSummary: SnakeSummary, decrementPerSegment=0.1, falloffFactor=1) {
		super();

		this.nodeBonuses = createEmptyGrid();

		// Iterate up the snake and fill in the board
		let dec = decrementPerSegment;
		let nextValue = -dec;
		let currentNode = snakeSummary.snakeFront;

		while (true) {

			const index = getIndex(currentNode.boardSpaceNode);
			this.nodeBonuses[index] = nextValue;
			nextValue -= dec;
			dec *= falloffFactor;


			if (isSnakeEnd(currentNode.tailBoundNode))
				break;
			else
				currentNode = currentNode.tailBoundNode;
		}
	}

	getValue(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeBonuses[index];
	}
}

export class AppleDistanceGrid extends InteractiveGrid {

	nodeDistances: number[];

	constructor(apple: Apple) {
		super();
		this.nodeDistances = createEmptyGrid();

		// Fill in grid with taxi distances from the apple
		for (let i = 0; i < this.nodeDistances.length; i++) {
			
			const gridSpot = getGridSpot(i);
			const distance = Math.abs(gridSpot.board_x - apple.board_x) + Math.abs(gridSpot.board_y - apple.board_y)
			
			this.nodeDistances[i] = distance - (BOARD_WIDTH+BOARD_HEIGHT)/2;
		}

	}
	
	getValue(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeDistances[index];
	}
}

function createEmptyGrid(): number[] {

	const gridSize = BOARD_WIDTH * BOARD_HEIGHT;
	const ret = [];
	ret[gridSize-1] = 0;
	ret.fill(0, 0);
	
	return ret;
}

function getIndex(gridSpot: GridSpot): number {
	return gridSpot.board_x + gridSpot.board_y * BOARD_WIDTH;
}

function getGridSpot(index: number): GridSpot {
	const x = index % BOARD_WIDTH;
	const y = Math.floor(index / BOARD_WIDTH)
	return { board_x: x, board_y: y};
}
