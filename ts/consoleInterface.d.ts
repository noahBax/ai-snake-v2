import { BoardNode, SnakeSummary } from "./snakeNodes.js";

export {};

declare global {
	interface Window { 
		tick: VoidFunction;
		snakeSummary: SnakeSummary;
		emptyNode: BoardNode;
	}
}