import { SnakeSummary } from "../../snakeNodes.js";
import expandAtNode from "../expandAtNode.js";
import Expedition from "../expedition.js";

export default function frontNotEnclosed(expedition: Expedition): boolean {
	const expansion = expandAtNode(expedition, {board_x: 0, board_y: 0});

	return expansion.length > 0;
}