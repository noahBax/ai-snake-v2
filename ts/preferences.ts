import Configuration from "./Exploration/configuration.js";

export const VISUALIZE_FAILED_ATTEMPTS = true;

export const BOARD_WIDTH  = 15;
export const BOARD_HEIGHT = 15;
export const DRAW_NODE_SIZE = 40;
export const ATTEMPT_LIMIT = 27000;

export const defaultConfig: Configuration = {
	avoidanceVisitPenalty: 3,
	avoidanceCoolDown: 0.06,
	snakePathDecrement: 0.2,
	snakePathFalloff: 1,
	appleDistanceMultiplier: 1,

	utilityCurvyLengthBack: 5,
	utilityCurvyStraightLength: 4,
	utilityCurvyTurnPenaltyDefault: 3,
	utilityStraightStraightLength: 8,
	utilityStraightTurnBonusDivisor: 5,
	utilityStraightLengthBack: 12,

	sizeOneGroups: 3,
	utilityCurvy: 2,
	largestGroupSize: 4,
	utilityStraight: 1
}