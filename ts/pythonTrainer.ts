import { argv } from "node:process";
import Configuration from './Exploration/configuration.js';
import { gameActive, quickTick, trainerInit } from './gamePlayer.js';
import { globalAttempts, globalMoves, globalProgress } from './performanceTracking.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from "./preferences.js";
import { AI_SCORE, tallyScore } from "./aiScoring.js";

function main(): void {

	// Config is passed as a JSON string
	const config = JSON.parse(argv[2]);

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