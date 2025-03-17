export var AI_SCORE = 0;

function calculateUtility(x: number): number {

	if (x == 0)
		return 0;

	if (x <= 400)
		return 400 - (x ** 2) / 400;

	else
		return 0;
}

export function tallyScore(moves: number): void {
	AI_SCORE += calculateUtility(moves);
}