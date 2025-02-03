import { DIRECTION } from "../snakeNodes.js";
import Expedition from "./expedition.js";

export default function getPathFromExpedition(e: Expedition, keysBuffer: DIRECTION[]): void {
	// console.log(e);
	if (e != undefined) {
		for (const m in e.path) {
			keysBuffer.unshift(e.path[m]);
		}
		// console.log(`Found a path: ${keysBuffer.join(', ')}`);
	}
}