import Apple from "../Board/apple.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import { GridSpot, SnakeSummary } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import frontCanSeeSnakeTail from "./Rules/frontCanSeeSnakeTail.js";
import expandAtNode from "./expandAtNode.js";
import frontNotEnclosed from "./Rules/frontNotEnclosed.js";
import * as utility from "../utilityFunctions/utilityFunctions.js";
import * as board from "../utilityFunctions/boardHeuristics.js";
import { ATTEMPT_LIMIT, BOARD_HEIGHT, BOARD_WIDTH } from "../preferences.js";
import findGroups from "../Board/findGroups.js";
import { upperIndex } from "../DrawingTools/frameManager.js";
import { snakeDrawBuffer } from "../DrawingTools/snakeDrawBuffer.js";
import { EMPTY_NODE } from "../Board/createBoard.js";
import groupLimit from "./Rules/groupLimit.js";
import { IN_TRAINING } from "../trainingModule.js";
import { incrementAttempts } from "../performanceTracking.js";
import Configuration from "./configuration.js";
import { shuffle } from "../randomizer.js";

export default function exploreSnake(snakeSummary: SnakeSummary, apple: Apple, config: Configuration): Expedition {

	
	// Start exploring from the initial point
	let goalMet = false;
	let winner: Expedition;
	const expeditions: Expedition[] = [];
	const duplicateBoard = [];

	const gridPackage: GridPackage = {
		avoidance: new board.AvoidanceGrid(),
		snakeGrid: new board.SnakePathGrid(snakeSummary, config),
		appleGrid: new board.AppleDistanceGrid(apple),
	}

	// console.log(gridPackage);

	// Add in the 0-state
	const empty: Expedition = {
		snake: snakeSummary,
		path: [],
		utility: Infinity,
		atApple: false,
		age: 0,
	}
	expeditions.push(empty);

	
	let limit = ATTEMPT_LIMIT;
	while (!goalMet && limit > 0) {

		
		limit--;
		incrementAttempts();
		if (!IN_TRAINING)
			window.attempts++;
		
		if (expeditions.length == 0) {
			return empty;
		}

		gridPackage.avoidance.coolDown(config);
		
		// Shuffle the expeditions so that the agent knows nothing about the board
		shuffle(expeditions);

		// Take the highest man off the stack
		const bestPath = expeditions.reduce((a,b) => comparePaths(a, b, gridPackage));
		expeditions.splice(expeditions.indexOf(bestPath), 1);

		findBoardRelation(bestPath.snake.snakeFront.boardSpaceNode, bestPath.snake.snakeFront.tailBoundNode.boardSpaceNode);

		// upperIndex();
		// snakeDrawBuffer.push([bestPath.snake, {...apple}, -1, bestPath.path]);
		
		// Check to see if the path with the best utility has reached the apple
		if (bestPath.atApple) {


			// Check to see that it passes all of the rules
			const ruleBroken = checkMeetsRules(bestPath);
			if (ruleBroken > 0) {
				// upperIndex();
				// snakeDrawBuffer.push([bestPath.snake, {...apple}, ruleBroken]);
				// console.log('Fail');
				continue;
			}

			// console.log(bestPath.path);
			
			winner = bestPath;
			goalMet = true;
			break;
		}

		gridPackage.avoidance.visitNode(bestPath.snake.snakeFront.boardSpaceNode, config);
		
		const pioneers = expandAtNode(bestPath, apple, duplicateBoard);
		
		// Calculate utility
		for (const p of pioneers){
			const smallGroups = findGroups(p.snake).sort( (a, b) => b.length - a.length);
			const sizeOneGroups = findGroups(p.snake).filter(a => a.length == 1).length;

			p.utility   = 0
						+ utility.curvy(p, config) * config.utilityCurvy
						+ Math.sqrt(smallGroups[0]?.length ?? 0) * config.largestGroupSize // Largest group
						+ smallGroups.length * config.numGroups // Number of groups
						+ (frontCanSeeSnakeTail(p) ? 1 : 0) * config.canSeeTail // Can see tail weight
						+ sizeOneGroups * config.sizeOneGroups; // Number of size one groups
						+ utility.straight(p, config) * config.utilityStraight
						+ gridPackage.appleGrid.getDirect(p.snake.snakeFront.boardSpaceNode) * config.appleDirectMultiplier
						+ gridPackage.appleGrid.getTaxi(p.snake.snakeFront.boardSpaceNode) * config.appleTaxiMultiplier
						+ gridPackage.snakeGrid.getValue(p.snake.snakeFront.boardSpaceNode)
						;

		}
		
		expeditions.push(...pioneers);
		
	}

	// if (!IN_TRAINING)
	// 	window.duplicateBoard = duplicateBoard;

	return winner;
}

function checkMeetsRules(e: Expedition): number {

	if (e.snake.length == BOARD_WIDTH * BOARD_HEIGHT - 1)
		return -2;
	
	const rules: ((e: Expedition) => boolean)[] = [
		frontCanSeeSnakeTail,
		// frontCanSeeSnakeBack,
		frontNotEnclosed,
		// tailNotSnakeFrontNeighbor,
		// groupLimit,
		// passesHamiltonTest,
	];

	for (let r = 0; r < rules.length; r++) {
		if (!rules[r](e)) {
			// console.log('fail');
			return r+1;
		}
	}

	return 0;
	// return rules.every( r => r(e));
}

function comparePaths(path1: Expedition, path2: Expedition, gridPackage: GridPackage): Expedition {
	const p1Score = findBoardHeuristicSum(path1.snake.snakeFront.boardSpaceNode, gridPackage);
	const p2Score = findBoardHeuristicSum(path2.snake.snakeFront.boardSpaceNode, gridPackage);

	if (path1.utility + p1Score < path2.utility + p2Score)
		return path1;
	else
		return path2;
}

function findBoardHeuristicSum(spot: GridSpot, gridPackage: GridPackage) {
	return gridPackage.avoidance.getValue(spot);
}

interface GridPackage {
	avoidance: board.AvoidanceGrid;
	snakeGrid: board.SnakePathGrid;
	appleGrid: board.AppleDistanceGrid;
}