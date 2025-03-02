import { gameActive, quickTick, trainerInit } from "./gamePlayer.js";
import { globalMoves, increaseMoves } from "./performanceTracking.js";
import fs from 'node:fs';
import { argv } from "node:process";

function main(): void {
	trainerInit();

	// console.log(argv);
	// const params = argv[2].split(' ');

	// Training loop
	while (gameActive) {
		quickTick();
	}

	fs.writeFileSync('result.txt', '' + globalMoves);
}

main();