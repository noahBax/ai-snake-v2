import { argv } from "node:process";
import Configuration from './Exploration/configuration.js';
import { gameActive, quickTick, trainerInit } from './gamePlayer.js';
import { globalAttempts, globalMoves, globalProgress } from './performanceTracking.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from "./preferences.js";
import { AI_SCORE, tallyScore } from "./aiScoring.js";

function main(): void {

	// Parameters for the config are passed as a string of numbers separated by
	// spaces. They come in a specific order corresponding to specific keys of
	// the config.
	const a = argv[2].split(' ')
	const objKeys: (keyof Configuration)[] = [
		"avoidanceVisitPenalty",
		"avoidanceCoolDown",
		"snakePathDecrement",
		"snakePathFalloff",
		"utilityCurvyLengthBack",
		"utilityCurvyStraightLength",
		"utilityCurvyTurnPenaltyDefault",
		"utilityStraightStraightLength",
		"utilityStraightTurnBonusDivisor",
		"utilityStraightLengthBack",
		"sizeOneGroups",
		"utilityCurvy",
		"largestGroupSize",
		"utilityStraight",
		"numGroups",
		"canSeeTail",
		"appleTaxiMultiplier",
	]
	const config: Configuration = {
		avoidanceVisitPenalty: 0,
		avoidanceCoolDown: 0,
		snakePathDecrement: 0,
		snakePathFalloff: 0,
		utilityCurvy: 0,
		utilityCurvyLengthBack: 0,
		utilityCurvyStraightLength: 0,
		utilityCurvyTurnPenaltyDefault: 0,
		utilityStraight: 0,
		utilityStraightStraightLength: 0,
		utilityStraightTurnBonusDivisor: 0,
		utilityStraightLengthBack: 0,
		sizeOneGroups: 0,
		largestGroupSize: 0,
		numGroups: 0,
		canSeeTail: 0,
		appleTaxiMultiplier: 0,
	};

	// Assign the keys
	for (let i = 0; i < objKeys.length; i++) {
		config[objKeys[i]] = parseFloat(a[i]);
	}

	// Initialize the code in training mode and then quick-tick until the game
	// ends.
	let prevMoves = 0;
	trainerInit(config);
	while (gameActive) {
		quickTick(config);
		const movesTaken = globalMoves - prevMoves;
		tallyScore(movesTaken);
		prevMoves = globalMoves;
	}
	
	// Log out the results of the solution's game. The calling Python process
	// can read stdout.

	if (globalProgress == BOARD_HEIGHT * BOARD_WIDTH)
		console.log(AI_SCORE + 50);
	else
		console.log(AI_SCORE)
	
	// console.log(globalMoves, globalAttempts, globalProgress);
}

main();