import { globalProgress } from "./performanceTracking.js";

export var AI_SCORE = 0;

function calculateUtility(x: number): number {

	if (x <= 400)
		return 400 - (x ** 2) / 400;

	else
		return 0;
}

export function tallyScore(moves: number): void {
	AI_SCORE -= moves;
	AI_SCORE += globalProgress
}