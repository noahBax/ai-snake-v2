import Apple from "../Board/apple.js";
import Configuration from "../Exploration/configuration.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../preferences.js";
import { BoardNode, GridSpot, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";


export class AvoidanceGrid {
	nodeHistory: number[];
	
	constructor() {
		this.nodeHistory = createEmptyGrid();
	}

	visitNode(gridSpot: GridSpot, configuration: Configuration): void {
		const index = getIndex(gridSpot);
		this.nodeHistory[index] += configuration.avoidanceVisitPenalty;

	}

	getValue(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeHistory[index];
	}

	coolDown(config: Configuration): void {

		for (let i = 0; i < this.nodeHistory.length; i++) {
			this.nodeHistory[i] -= Math.abs(config.avoidanceCoolDown);	
			if (this.nodeHistory[i] < 0) {
				this.nodeHistory[i] = 0;
			}
		}

	}
}

export class SnakePathGrid {

	nodeBonuses: number[];

	constructor(snakeSummary: SnakeSummary, config: Configuration) {

		this.nodeBonuses = createEmptyGrid();

		// Iterate up the snake and fill in the board
		let dec = config.snakePathDecrement;
		let nextValue = -dec;
		let currentNode = snakeSummary.snakeFront;

		while (true) {

			const index = getIndex(currentNode.boardSpaceNode);
			this.nodeBonuses[index] = nextValue;
			nextValue -= dec;
			dec *= config.snakePathFalloff;


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

export class AppleDistanceGrid {

	readonly nodeTaxiDistances: number[];
	readonly nodeDirectDistances: number[];

	constructor(apple: Apple) {
		this.nodeDirectDistances = createEmptyGrid();
		this.nodeTaxiDistances = createEmptyGrid();

		// Fill in grid with taxi distances from the apple
		for (let i = 0; i < this.nodeTaxiDistances.length; i++) {
			
			const gridSpot = getGridSpot(i);
			const distance = Math.abs(gridSpot.board_x - apple.board_x) + Math.abs(gridSpot.board_y - apple.board_y)
			
			this.nodeTaxiDistances[i] = distance;
		}

		// Fill in grid with direct distances from the apple
		for (let i = 0; i < this.nodeDirectDistances.length; i++) {
			
			const gridSpot = getGridSpot(i);
			const distance = Math.sqrt((gridSpot.board_x - apple.board_x)**2 + (gridSpot.board_y - apple.board_y)**2)
			
			this.nodeDirectDistances[i] = distance;
		}

	}
	
	getDirect(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeDirectDistances[index];
	}

	getTaxi(gridSpot: GridSpot): number {
		const index = getIndex(gridSpot);
		return this.nodeTaxiDistances[index];
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
