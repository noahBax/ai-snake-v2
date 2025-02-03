import { frameHandler } from "./DrawingTools/frameManager.js";
import { init } from "./gamePlayer.js";

function main() {
	init();
	frameHandler(0);
}

main();