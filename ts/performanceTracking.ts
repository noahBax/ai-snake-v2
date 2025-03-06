export var globalAttempts = 0;
export function incrementAttempts(): void {
	globalAttempts++;
}

export var globalMoves = 0;
export function increaseMoves(amt: number): void {
	globalMoves += amt;
}

export var globalProgress = 0;
export function incrementProgress(): void {
	globalProgress++;
}