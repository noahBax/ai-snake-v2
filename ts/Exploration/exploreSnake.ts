import accessNodeRelation from "../Board/accessNodeRelation.js";
import Apple from "../Board/apple.js";
import findBoardRelation from "../Board/findBoardRelation.js";
import createSnakeCopy from "../Snake/createSnakeCopy.js";
import { BoardNode, DIRECTION, isSnakeEnd, SnakeNode, SnakeSummary } from "../snakeNodes.js";
import Expedition from "./expedition.js";
import moveSnake from "../Snake/moveSnake.js";
import { EMPTY_NODE } from "../Board/createBoard.js";
import frontCanSeeSnakeTail from "./Rules/frontCanSeeSnakeTail.js";
import tailNotSnakeFrontNeighbor from "./Rules/tailNotSnakeFrontNeighbor.js";
import { snakeDrawBuffer } from "../DrawingTools/snakeDrawBuffer.js";
import { isDuplicate, CompassNode } from "./duplicateFinder.js";
import { upperIndex } from "../DrawingTools/frameManager.js";
import expandAtNode from "./expandAtNode.js";
import frontNotEnclosed from "./Rules/frontNotEnclosed.js";
import * as utility from "../utilityFunctions/utilityFunctions.js";
import frontCanSeeSnakeBack from "./Rules/frontCanSeeSnakeBack.js";
import { ATTEMPT_LIMIT, BOARD_WIDTH } from "../preferences.js";
import { FamilyNode } from "./LineageManager/lineage.js";

export default function exploreSnake(snakeSummary: SnakeSummary, apple: Apple): Expedition {

	console.clear();
	
	// Start exploring from the initial point
	let goalMet = false;
	let winner: Expedition;
	const expeditions: Expedition[] = [];
	const duplicateBoard = [];
	const badBoard: number[] = [];
	const familyTree = new FamilyNode(false);

	// Add in the 0-state
	const empty: Expedition = {
		snake: snakeSummary,
		path: [],
		utility: Infinity,
		atApple: false,
		lineageNode: familyTree,
		age: 0,
	}
	expeditions.push(empty);

	
	let limit = ATTEMPT_LIMIT;
	while (!goalMet && limit > 0) {

		for (let i = 0; i < badBoard.length; i++) {
			badBoard[i] = Math.max(badBoard[i] - 0.005, 0);
		}
		
		limit--;
		window.attempts++;
		
		if (expeditions.length == 0) {
			return empty;
		}
		
		// Take the highest man off the stack
		const bestPath = expeditions.reduce((a,b) => {if (a.utility  < b.utility ) {return a} else {return b}});
		expeditions.splice(expeditions.indexOf(bestPath), 1);

		findBoardRelation(bestPath.snake.snakeFront.boardSpaceNode, bestPath.snake.snakeFront.tailBoundNode.boardSpaceNode);

		// // Check to see if it is a duplicate
		// if (isDuplicate(duplicateBoard, bestPath)) {
		// 	console.log('duped: ', JSON.stringify(bestPath.path));
		// 	continue;
		// }

		// if (!isDuplicate(duplicateBoard, bestPath)) {
		// 	console.error('BEEP');
		// 	return;
		// }

		upperIndex();
		snakeDrawBuffer.push([bestPath.snake, {...apple}, -1, bestPath.path]);
		
		// Check to see if the path with the best utility has reached the apple
		if (bestPath.atApple) {


			// Check to see that it passes all of the rules
			const ruleBroken = checkMeetsRules(bestPath);
			if (ruleBroken > 0) {
				// snakeDrawBuffer.push([bestPath.snake, {...apple}, ruleBroken]);
				console.log('Fail');
				bestPath.lineageNode.incrementDebt(3, 0.95);
				continue;
			}

			console.log(bestPath.path);
			
			winner = bestPath;
			bestPath.lineageNode.parent = false;
			bestPath.lineageNode.familyDebt = 0;
			bestPath.lineageNode.cumulativeDebt = 0;
			goalMet = true;
			break;
		}

		empty.lineageNode.forgiveDebt(0.2);

		const spot = bestPath.snake.snakeFront.boardSpaceNode;
		const spotIndex = spot.board_x + spot.board_y * BOARD_WIDTH;
		
		const pioneers = expandAtNode(bestPath, apple, duplicateBoard);
		
		// Update debt for pioneers
		if (pioneers.length > 0)
			bestPath.lineageNode.incrementDebt(1, 0.9, 0.15);
		
		// Calculate the cumulative debt
		for (const p of pioneers)
			p.lineageNode.calculateCumulativeDebt(1.01);
		
		const logLineageDebt = Math.log(bestPath.lineageNode.cumulativeDebt)
		
		// Calculate utility
		for (const p of pioneers){
			if (!badBoard[spotIndex])
				badBoard[spotIndex] = 1;
			else
				badBoard[spotIndex] += 1;
			// p.utility = utility.stable(p, apple) + Math.cbrt(p.lineageNode.cumulativeDebt);

			// const distanceEffect = (1 - 1/utility.taxi(p, apple));  // Gets closer to 1 as taxi goes to 0
			// const curvyScore = utility.curvy(p, apple);
			
			p.utility   = 0
						+ utility.curvy(p, apple)
						- utility.straight(p, apple)
						// + logLineageDebt
						// + utility.turnCount(p) / distanceEffect * logLineageDebt
						// + utility.turnCount(p)
						// + Math.log(utility.direct(p, apple))
						// + logLineageDebt **2 / 10122 * 0.001 * utility.direct(p, apple) 
						// + utility.taxi(p, apple) ** 2 * logLineageDebt
						// + utility.taxi(p, apple)
						// + utility.taxi(p, apple) * utility.distToTail(p) * Math.sqrt(p.path.length) / 50
						+ utility.taxi(p, apple) * 2
						// + utility.curvy(p, apple)
						// - utility.turnCount(p) * (1-1/logLineageDebt)
						// + Math.log2(p.lineageNode.cumulativeDebt)
						// + Math.sqrt(utility.distToTail(p)) / 2;
						// + utility.distToTail(p) * (1 - 1/p.lineageNode.cumulativeDebt) / utility.turnCount(p)
						// + utility.distToTail(p)
						// + utility.straight(p, apple) * distanceEffect
						// + curvyScore * (1 - 1/p.lineageNode.cumulativeDebt)
						// - utility.straight(p, apple) / 10 * logLineageDebt / distanceEffect / 2
						// + utility.projection(p, apple, false) / logLineageDebt ** 2
						// + utility.projection(p, apple, false) ** 2
						+ badBoard[spotIndex] * 1
						- (utility.direct(p, apple) == 0 ? 500 : 0)
						// + Math.max(logLineageDebt - utility.taxi(p, apple), 0)
						;
						// - utility.distToTail(p) * Math.log(p.lineageNode.cumulativeDebt) / 5 * Math.sin(p.lineageNode.cumulativeDebt/4);

		}
		
		expeditions.push(...pioneers);
		
	}

	window.duplicateBoard = duplicateBoard;

	return winner;
}

function checkMeetsRules(e: Expedition): number {
	const rules: ((e: Expedition) => boolean)[] = [
		frontCanSeeSnakeTail,
		// frontCanSeeSnakeBack,
		frontNotEnclosed,
		// tailNotSnakeFrontNeighbor,
	];

	for (let r = 0; r < rules.length; r++) {
		if (!rules[r](e)) {
			return r+1;
		}
	}

	return 0;
	// return rules.every( r => r(e));
}