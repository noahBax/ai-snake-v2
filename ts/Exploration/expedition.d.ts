import { DIRECTION, SnakeSummary } from "../snakeNodes.js";
import { FamilyNode } from "./LineageManager/lineage.js";

export default interface Expedition {
	snake: SnakeSummary,
	utility: number,
	path: DIRECTION[],
	atApple: boolean,
	lineageNode: FamilyNode,
	age: number,
}