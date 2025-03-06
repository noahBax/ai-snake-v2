import { gameActive, quickTick, trainerInit } from "./gamePlayer.js";
import { globalMoves } from "./performanceTracking.js";
import { defaultConfig } from "./preferences.js";

function main(): void {
	trainerInit(defaultConfig);

	// Training loop
	while (gameActive) {
		quickTick(defaultConfig);
	}

	console.log(globalMoves);
}

main();