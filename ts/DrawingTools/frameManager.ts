import { gameActive, snakeTickFunction } from "../gamePlayer.js";
import { snakeDrawBuffer } from "./snakeDrawBuffer.js";
import { lock_tick, TICK_LOCK } from "./frameLocks.js";
import Apple from "../Board/apple.js";
import { drawSnakeBody, drawHead, drawApple, drawSnakeTail } from "../drawThings.js";
import { SnakeSummary } from "../snakeNodes.js";
import { clearGameCanvas } from "./clearGameCanvas.js";

var frameSkipCount = 0;
var waitFrames = frameSkipCount;
var frameBufferIndex = 0;
export function lowerIndex() {
	frameBufferIndex = Math.max(0, frameBufferIndex - 1);
}
export function upperIndex() {
	frameBufferIndex = Math.min(frameBufferIndex + 1, snakeDrawBuffer.length);
}

const commentEle: HTMLSpanElement = document.getElementById('frameComment');

export function initFrameManager(): void {
	window.frameBufferIndex = frameBufferIndex;
}

export function frameHandler(ts: number): void {

	window.frameBufferIndex = frameBufferIndex;
	
	if (waitFrames > 0) {
		waitFrames--;
		requestAnimationFrame(frameHandler);
		return;
	}
	waitFrames = frameSkipCount;
	
	if (snakeDrawBuffer.length > frameBufferIndex) {
		// const frame = snakeDrawBuffer.shift();
		const frame = snakeDrawBuffer[frameBufferIndex];
		if (gameActive) {
			// console.log(gameActive);
			frameBufferIndex++;

		}
		// if (frame[2])
		// 	waitFrames += frameSkipCount * 30;
		commentEle.textContent = '' + frame[2];
		// drawSnake(frame[0].snake, frame[1], frame[2]);
		drawSnake(...frame);
		// lock_tick();

	} else
	if (!TICK_LOCK) {
		lock_tick();
		snakeTickFunction();
	}
	
	requestAnimationFrame(frameHandler);
}

function drawSnake(snakeSummary: SnakeSummary, apple: Apple, c: number, _?) {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	drawSnakeBody(snakeSummary, c);
	drawHead(snakeSummary, c);

	// Draw the apple
	drawApple(apple);

	// drawSnakeTail(snakeSummary);
	// 	if (c > 0) {
	// 	// Visualize behind
	// }
}
