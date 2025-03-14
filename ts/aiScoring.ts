export var AI_SCORE = 0;

function calculateUtility(x: number): number {

	if (x <= 40)
		return 40 - (x ** 2) / 40;

	else
		return 0;
}

export function tallyScore(moves: number): void {
	AI_SCORE += calculateUtility(moves);
}