import Apple from "./Board/apple.js";
import { CompassNode } from "./Exploration/duplicateFinder.js";
import { BoardNode, DIRECTION, SnakeSummary } from "./snakeNodes.js";

export {};

declare global {
	interface Window { 
		tick: VoidFunction;
		snakeSummary: SnakeSummary;
		emptyNode: BoardNode;
		keysBuffer: DIRECTION[];
		snakeDrawBuffer: [SnakeSummary, Apple, number, DIRECTION[]?][]; 
		frameBufferIndex: number;
		duplicateBoard: CompassNode[];
		expandAtNode;
		attempts: number;
	}
}