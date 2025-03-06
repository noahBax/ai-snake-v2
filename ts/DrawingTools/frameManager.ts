import { quickTick, gameActive, snakeTickFunction } from "../gamePlayer.js";
import { snakeDrawBuffer } from "./snakeDrawBuffer.js";
import Apple from "../Board/apple.js";
import { drawSnakeBody, drawHead, drawApple } from "../drawThings.js";
import { SnakeSummary } from "../snakeNodes.js";
import { clearGameCanvas } from "./clearGameCanvas.js";
import { defaultConfig } from "../preferences.js";
import { globalMoves } from "../performanceTracking.js";

var frameSkipCount = 0;
var waitFrames = frameSkipCount;
var frameBufferIndex = 0;
var planningAttempts: HTMLSpanElement;
var globalMovesEle: HTMLSpanElement;

export function lowerIndex() {
	frameBufferIndex = Math.max(0, frameBufferIndex - 1);
}
export function upperIndex() {
	frameBufferIndex = Math.min(frameBufferIndex + 1, snakeDrawBuffer.length-1);
}
export function refreshIndex(): void {
	frameBufferIndex = snakeDrawBuffer.length - 1;
}

var commentEle: HTMLSpanElement;

export function initFrameManager(): void {
	commentEle = document.getElementById('frameComment');
	window.frameBufferIndex = frameBufferIndex;
	planningAttempts = document.getElementById("planningAttempts") as HTMLSpanElement
	globalMovesEle = document.getElementById("globalMoves") as HTMLSpanElement;
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
		planningAttempts.textContent = '' + window.attempts;
		globalMovesEle.textContent = '' + globalMoves;
		const frame = snakeDrawBuffer[frameBufferIndex];
		if (gameActive) {
			frameBufferIndex++;

		}
		commentEle.textContent = '' + frame[2];
		drawSnake(...frame);

	} else
		snakeTickFunction(defaultConfig);
		// quickTick(defaultConfig);
	
	requestAnimationFrame(frameHandler);
}

function drawSnake(snakeSummary: SnakeSummary, apple: Apple, c: number, _?) {

	// Clear the canvas of any existing snakes
	clearGameCanvas();

	drawSnakeBody(snakeSummary, c);
	drawHead(snakeSummary, c);

	// Draw the apple
	drawApple(apple);

}
