import { DIRECTION, SnakeSummary } from "../snakeNodes.js";

export default interface Expedition {
	snake: SnakeSummary,
	utility: number,
	path: DIRECTION[],
	atApple: boolean
}