import { AI_SCORE, tallyScore } from "./aiScoring.js";
import { gameActive, quickTick, trainerInit } from "./gamePlayer.js";
import { globalMoves, globalProgress } from "./performanceTracking.js";
import { BOARD_HEIGHT, BOARD_WIDTH, defaultConfig } from "./preferences.js";

function main(): void {
	trainerInit(defaultConfig);

	// Training loop
	let prevMoves = 0;
	while (gameActive) {
		quickTick(defaultConfig);
		const movesTaken = globalMoves - prevMoves;
		tallyScore(movesTaken);
		prevMoves = globalMoves;
	}

	if (globalProgress == BOARD_HEIGHT * BOARD_WIDTH)
		console.log(AI_SCORE + 50);
	else
		console.log(AI_SCORE)
}

main();