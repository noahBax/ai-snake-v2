import { countOfColNodes, countOfRowNodes, GAME_BOARD_CTX, NODE_SIZE } from "./initDrawingTools.js";

export function clearGameCanvas() {

	GAME_BOARD_CTX.fillStyle = "#FFF";
	GAME_BOARD_CTX.fillRect(0, 0, NODE_SIZE * countOfRowNodes, NODE_SIZE * countOfColNodes);
	
}