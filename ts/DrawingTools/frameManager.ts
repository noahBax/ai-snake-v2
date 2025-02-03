import { snakeTickFunction } from "../gamePlayer.js";
import { snakeDrawBuffer } from "./snakeDrawBuffer.js";
import { lock_tick, TICK_LOCK } from "./frameLocks.js";
import Apple from "../Board/apple.js";
import { drawSnakeBody, drawHead, drawApple } from "../drawThings.js";
import { SnakeSummary } from "../snakeNodes.js";
import { clearGameCanvas } from "./clearGameCanvas.js";

export function frameHandler(ts: number): void {

	if (snakeDrawBuffer.length > 0) {
		const frame = snakeDrawBuffer.shift();
		drawSnake(...frame);
	}
	if (!TICK_LOCK) {
		lock_tick();
		snakeTickFunction();
	}
	
	requestAnimationFrame(frameHandler);
}

function drawSnake(snakeSummary: SnakeSummary, apple: Apple) {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	drawSnakeBody(snakeSummary);
	drawHead(snakeSummary);

	// Draw the apple
	drawApple(apple);
}
