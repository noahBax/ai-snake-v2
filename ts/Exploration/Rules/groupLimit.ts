import findGroups from "../../Board/findGroups.js";
import Expedition from "../expedition.js";

export default function groupLimit(expedition: Expedition): boolean {
	const groups = findGroups(expedition.snake).filter( g => g.length == 1);

	return groups.length == 0;
}