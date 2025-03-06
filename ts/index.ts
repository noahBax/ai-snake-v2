import { frameHandler } from "./DrawingTools/frameManager.js";
import { init } from "./gamePlayer.js";
import { defaultConfig } from "./preferences.js";

function main() {
	init(defaultConfig);
	frameHandler(0);
}

main();