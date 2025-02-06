import Apple from "../Board/apple.js";
import Expedition from "../Exploration/expedition.js";
import getSnakeInstructions from "../Snake/getSnakeInstructions.js";

export function direct(expedition: Expedition, apple: Apple): number {
	const p1 = expedition.snake.snakeFront.boardSpaceNode;
	const p2 = apple;
	return (p1.board_x - p2.board_x) ** 2 + (p1.board_y - p2.board_y) ** 2;
}

export function taxi(expedition: Expedition, apple: Apple): number {
	const p1 = expedition.snake.snakeFront.boardSpaceNode;
	const p2 = apple;
	return Math.abs(p1.board_x - p2.board_x) + Math.abs(p1.board_y - p2.board_y);
}

export function turnCount(expedition: Expedition): number {

	const directions = expedition.path;
	let straightCount = 0;
	let turnCounts = 0;
	
	let lastDir = directions[0];
	for (const d of directions.slice(1)) {
		if (d == lastDir)
			straightCount++;
		else {
			if (straightCount < 3)
				turnCounts++
			lastDir = d;
			straightCount = 0;
		}
	}

	return turnCounts;
}

export function distToTail(expedition: Expedition): number {
	const back = expedition.snake.snakeBack.boardSpaceNode;
	return taxi(expedition, back);
}

export function projection(expedition: Expedition, apple: Apple, useMin: boolean) {
	const front = expedition.snake.snakeFront.boardSpaceNode;
	const x = Math.abs(front.board_x - apple.board_x);
	const y = Math.abs(front.board_y - apple.board_y);
	if (useMin)
		return Math.min(x, y);
	else
		return Math.max(x, y);
}

export function curvy(expedition: Expedition, apple: Apple): number {
	
	let directions = [...getSnakeInstructions(expedition.snake)];
	
	let turnPenalty = 0;
	let straightCount = 0;

	let lastDir = directions[0];
	for (const d of directions.slice(1)) {
		if (d == lastDir)
			straightCount++;
		
		else {
			if (straightCount < 5)
				turnPenalty += (4 - straightCount);

			lastDir = d;
			straightCount = 0;
		}
	}
	
	return turnPenalty;
}

export function straight(expedition: Expedition, apple: Apple): number {
	
	let directions = [...getSnakeInstructions(expedition.snake)];
	
	let turnBonus = 0;
	let straightCount = 0;

	let lastDir = directions[0];
	for (const d of directions.slice(1)) {
		if (d == lastDir)
			straightCount++;

		else {
			if (straightCount > 8)
				turnBonus += straightCount / 5

			lastDir = d;
			straightCount = 0;
		}
	}
	return turnBonus;
}
	

function segmentLengthPenalty(x: number): number {
	return Math.max(0, -(1.3 ** x)+5.39063);
}
function distanceFromStartPenalty(x: number): number {
	return -(x) / (1 + x) + 1
}

function lengthBackMultiplier(length: number) {
	return length / (15 + length)
}
function distanceToApplePenalty(x: number): number {
	return -(1.04 ** x) + 2;
}