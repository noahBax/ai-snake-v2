import Apple from "./Board/apple.js";
import { BoardNode, DIRECTION, SnakeSummary } from "./snakeNodes.js";

export {};

declare global {
	interface Window { 
		tick: VoidFunction;
		snakeSummary: SnakeSummary;
		emptyNode: BoardNode;
		keysBuffer: DIRECTION[];
		snakeDrawBuffer: [SnakeSummary, Apple, number][]; 
	}
}