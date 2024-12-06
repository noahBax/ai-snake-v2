var GAME_BOARD_ELE: HTMLCanvasElement;
const MAIN_BOARD_ID = "gameBoardEle";
export var GAME_BOARD_CTX: CanvasRenderingContext2D;

export var NODE_SIZE: number;
export var countOfRowNodes: number;
export var countOfColNodes: number;

// Set some variables by looking at the document
export default function initDrawingTools(width: number, height: number, nodeSize: number) {

	GAME_BOARD_ELE = document.getElementById(MAIN_BOARD_ID) as HTMLCanvasElement;
	GAME_BOARD_ELE.width = width * nodeSize;
	GAME_BOARD_ELE.height = height * nodeSize;

	GAME_BOARD_CTX = GAME_BOARD_ELE.getContext("2d");

	NODE_SIZE = nodeSize;
	countOfRowNodes = Math.floor(width);
	countOfColNodes = Math.floor(height);
}