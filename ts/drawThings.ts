import Apple from "./Board/apple.js";
import boardToCoord from "./Board/boardToCoord.js";
import findBoardRelation from "./Board/findBoardRelation.js";
import { GAME_BOARD_CTX, NODE_SIZE } from "./DrawingTools/initDrawingTools.js";
import { spriteSheetImage } from "./gamePlayer.js";
import { SHEET, sprites } from "./sheet.js";
import { isSnakeEnd, SnakeNode, SnakeSummary } from "./snakeNodes.js";

export function drawApple(apple: Apple): void {
	// GAME_BOARD_CTX.fillStyle = "#0F0";

	const drawX = apple.board_x;
	const drawY = apple.board_y;

	let s: [number, number, number, number];
	let d: [number, number, number, number];
	s = [SHEET["apple"].x, SHEET["apple"].y, 10, 10];
	d = [drawX * NODE_SIZE, drawY * NODE_SIZE, NODE_SIZE, NODE_SIZE];
	
	GAME_BOARD_CTX.drawImage(spriteSheetImage, ...s, ...d);
}

export function drawHead(snakeSummary: SnakeSummary): void {
	const front = snakeSummary.snakeFront
	const dir = findBoardRelation(front.boardSpaceNode, front.tailBoundNode.boardSpaceNode);
	// const directionArray: sprites[] = ["up", "left", "down", "right"];
	const directionArray: sprites[] = ["down", "left", "up", "right"];
	const sprite = directionArray[dir];

	const drawX = front.boardSpaceNode.board_x;
	const drawY = front.boardSpaceNode.board_y;

	let s: [number, number, number, number];
	let d: [number, number, number, number];
	s = [SHEET[sprite].x, SHEET[sprite].y, 10, 10];
	d = [drawX * NODE_SIZE, drawY * NODE_SIZE, NODE_SIZE, NODE_SIZE];
	
	GAME_BOARD_CTX.drawImage(spriteSheetImage, ...s, ...d);
}

export function drawDead(snakeSummary: SnakeSummary): void {
	const front = snakeSummary.snakeFront
	const dir = findBoardRelation(front.boardSpaceNode, front.tailBoundNode.boardSpaceNode);
	// const directionArray: sprites[] = ["up", "left", "down", "right"];
	const directionArray: sprites[] = ["deadDown", "deadRight", "deadUp", "deadLeft"];
	const sprite = directionArray[dir];

	const drawX = front.boardSpaceNode.board_x;
	const drawY = front.boardSpaceNode.board_y;

	let s: [number, number, number, number];
	let d: [number, number, number, number];
	s = [SHEET[sprite].x, SHEET[sprite].y, 10, 10];
	d = [drawX * NODE_SIZE, drawY * NODE_SIZE, NODE_SIZE, NODE_SIZE];
	
	GAME_BOARD_CTX.drawImage(spriteSheetImage, ...s, ...d);
}

export function drawSnakeBody(snakeSummary: SnakeSummary): void {
	// Draw and move the snake
	GAME_BOARD_CTX.strokeStyle = "#00FF00";
	GAME_BOARD_CTX.lineWidth = NODE_SIZE / 2;
	GAME_BOARD_CTX.lineJoin = "bevel";
	GAME_BOARD_CTX.lineCap = "round";

	let currentSegment = snakeSummary.snakeFront as SnakeNode;
	GAME_BOARD_CTX.moveTo(...boardToCoord(currentSegment.boardSpaceNode));
	GAME_BOARD_CTX.beginPath();
	while (true) {
		GAME_BOARD_CTX.lineTo(...boardToCoord(currentSegment.boardSpaceNode));

		if (isSnakeEnd(currentSegment.tailBoundNode))
			break;

		currentSegment = currentSegment.tailBoundNode;
	}
	GAME_BOARD_CTX.stroke();
}