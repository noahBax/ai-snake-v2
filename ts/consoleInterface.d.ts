import { BoardNode, GameKit } from "./snakeNodes.js";

export {};

declare global {
	interface Window { 
		tick: VoidFunction;
		currentKit: GameKit;
		emptyNode: BoardNode;
	}
}