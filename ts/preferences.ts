import Configuration from "./Exploration/configuration.js";

export const VISUALIZE_FAILED_ATTEMPTS = true;

export const BOARD_WIDTH  = 20;
export const BOARD_HEIGHT = 20;
export const DRAW_NODE_SIZE = 40;
export const ATTEMPT_LIMIT = 3500;
export const MOVES_LIMIT = 33000

// const myConfig: Configuration = {
// 	avoidanceVisitPenalty: 3,
// 	avoidanceCoolDown: 0.06,
// 	snakePathDecrement: 0.2,
// 	snakePathFalloff: 1,
// 	appleDistanceMultiplier: 1,

// 	utilityCurvyLengthBack: 5,
// 	utilityCurvyStraightLength: 4,
// 	utilityCurvyTurnPenaltyDefault: 3,
// 	utilityStraightStraightLength: 8,
// 	utilityStraightTurnBonusDivisor: 5,
// 	utilityStraightLengthBack: 12,

// 	sizeOneGroups: 3,
// 	utilityCurvy: 2,
// 	largestGroupSize: 4,
// 	utilityStraight: 1
// }


// const config8x8: Configuration = {
// 	avoidanceVisitPenalty: 1.44417885,
// 	avoidanceCoolDown: 1.17138944,
// 	snakePathDecrement: -0.08484873,
// 	snakePathFalloff: -0.31653622,
// 	appleDistanceMultiplier: 0.29009722,
// 	utilityCurvyLengthBack: -0.64392488,
// 	utilityCurvyStraightLength: 3.36980185,
// 	utilityCurvyTurnPenaltyDefault: 5.02445287,
// 	utilityStraightStraightLength: 4.15751833,
// 	utilityStraightTurnBonusDivisor: 3.22155549,
// 	utilityStraightLengthBack: 2.23812709,
// 	sizeOneGroups: 3.66873066,
// 	utilityCurvy: 4.88885749,
// 	largestGroupSize: 5.44115317,
// 	utilityStraight: 3.57176464
// }

// const config20x20: Configuration = {
// 	avoidanceVisitPenalty: 2.45915968,
// 	avoidanceCoolDown: -1.74812707,
// 	snakePathDecrement: 0.28234333,
// 	snakePathFalloff: -0.9086313,
// 	appleDistanceMultiplier: -1.08109714,
// 	utilityCurvyLengthBack: -1.14643788,
// 	utilityCurvyStraightLength: -1.11292238,
// 	utilityCurvyTurnPenaltyDefault: -0.95129001,
// 	utilityStraightStraightLength: 0.57313641,
// 	utilityStraightTurnBonusDivisor: -0.74902693,
// 	utilityStraightLengthBack: 1.24964584,
// 	sizeOneGroups: 0.70012375,
// 	utilityCurvy: 0.39218307,
// 	largestGroupSize: 0.31099431,
// 	utilityStraight: 0.91681541,
// }
// const config20x20OldOld: Configuration = {
// 	avoidanceVisitPenalty: 1.62732093,
// 	avoidanceCoolDown: -2.88693239,
// 	snakePathDecrement: -1.8866271,
// 	snakePathFalloff: 0.18579941,
// 	appleDistanceMultiplier: 0.48663105,
// 	utilityCurvyLengthBack: 2.19791023,
// 	utilityCurvyStraightLength: 0.37401233,
// 	utilityCurvyTurnPenaltyDefault: -2.78000682,
// 	utilityStraightStraightLength: 0.66489119,
// 	utilityStraightTurnBonusDivisor: -0.49097109,
// 	utilityStraightLengthBack: 0.51324522,
// 	sizeOneGroups: 0.62385023,
// 	utilityCurvy: -2.21833463,
// 	largestGroupSize: -1.26720749,
// 	utilityStraight: 1.52657982,
// }
// const config20x20Old: Configuration = {
// 	avoidanceVisitPenalty: 1.79075608,
// 	avoidanceCoolDown: -0.58720139,
// 	snakePathDecrement: -0.99313114,
// 	snakePathFalloff: 0.97447599,
// 	appleDistanceMultiplier: 1.21558593,
// 	utilityCurvyLengthBack: -0.81074953,
// 	utilityCurvyStraightLength: -1.22813992,
// 	utilityCurvyTurnPenaltyDefault: 0.27829593,
// 	utilityStraightStraightLength: 1.64419196,
// 	utilityStraightTurnBonusDivisor: 0.91090198,
// 	utilityStraightLengthBack: -0.33953822,
// 	sizeOneGroups: -1.97171238,
// 	utilityCurvy: 0.03358187,
// 	largestGroupSize: 1.83802842,
// 	utilityStraight: 1.50989642,
// }
// const config20x20MyGodItsSoBad: Configuration = {
// 	avoidanceVisitPenalty: 1.556197,
// 	avoidanceCoolDown: -0.778241,
// 	snakePathDecrement: -1.69830944,
// 	snakePathFalloff: 0.38948953,
// 	appleDistanceMultiplier: -1.9076722,
// 	utilityCurvyLengthBack: -1.24504093,
// 	utilityCurvyStraightLength: -1.16976017,
// 	utilityCurvyTurnPenaltyDefault: -0.36075012,
// 	utilityStraightStraightLength: 1.19355623,
// 	utilityStraightTurnBonusDivisor: 0.51641498,
// 	utilityStraightLengthBack: 3.01535808,
// 	sizeOneGroups: 1.75713529,
// 	utilityCurvy: -0.16331111,
// 	largestGroupSize: 1.00232709,
// 	utilityStraight: -0.99684504,
// }
// const config18x18Good: Configuration = {
// 	avoidanceVisitPenalty: 1.6951505,
// 	avoidanceCoolDown: -0.50203985,
// 	snakePathDecrement: 0.62540583,
// 	snakePathFalloff: -1.02754309,
// 	appleDistanceMultiplier: 1.78513516,
// 	utilityCurvyLengthBack: 1.40653078,
// 	utilityCurvyStraightLength: 0.63632081,
// 	utilityCurvyTurnPenaltyDefault: 0.21292212,
// 	utilityStraightStraightLength: -0.03270798,
// 	utilityStraightTurnBonusDivisor: -1.19981275,
// 	utilityStraightLengthBack: 1.523564,
// 	sizeOneGroups: 0.74568052,
// 	utilityCurvy: 0.42431747,
// 	largestGroupSize: 0.63696736,
// 	utilityStraight: -1.8962208,
// }
// const config18x18: Configuration = {
// 	avoidanceVisitPenalty: 1.30550352,
// 	avoidanceCoolDown: -4.8123254,
// 	snakePathDecrement: 1.21974192,
// 	snakePathFalloff: -5.39008515,
// 	appleDistanceMultiplier: 1.69780008,
// 	utilityCurvyLengthBack: 2.8094482,
// 	utilityCurvyStraightLength: 2.8990793,
// 	utilityCurvyTurnPenaltyDefault: 5.50406172,
// 	utilityStraightStraightLength: -1.6123872,
// 	utilityStraightTurnBonusDivisor: 0.59651681,
// 	utilityStraightLengthBack: 0.12209585,
// 	sizeOneGroups: -0.22552263,
// 	utilityCurvy: -4.52648387,
// 	largestGroupSize: -1.43085958,
// 	utilityStraight: -1.71811997,
// }
// const config18x18Eh: Configuration = {
// 	avoidanceVisitPenalty: 1.556197,
// 	avoidanceCoolDown: -0.778241,
// 	snakePathDecrement: -1.69830944,
// 	snakePathFalloff: 0.38948953,
// 	appleDistanceMultiplier: -1.9076722,
// 	utilityCurvyLengthBack: -1.93309705,
// 	utilityCurvyStraightLength: -1.16976017,
// 	utilityCurvyTurnPenaltyDefault: -0.36075012,
// 	utilityStraightStraightLength: 1.19355623,
// 	utilityStraightTurnBonusDivisor: 0.51641498,
// 	utilityStraightLengthBack: 1.03873808,
// 	sizeOneGroups: 1.75713529,
// 	utilityCurvy: -0.40212867,
// 	largestGroupSize: 1.8647965,
// 	utilityStraight: -0.78103961,
// }

// /**
//  * Bro this is so fascinating. This solution evolved so that the SnakePathGrid
//  * has a consistent 5.4 rating along almost every node after 5 or so. I mean
//  * it's obvious when the falloff factor is below 1, but I studied the functions
//  * that other solutions have come up for the SnakePath and there is a
//  * fascinating variety to all of them.
//  *
//  * I suppose this one is rather boring as it seems to try to avoid itself which
//  * is not what I had intended, but I never realized the variety that is possible
//  * with this. Or maybe I'm just tired
//  *
//  * Looking at its searching behavior though, this could be beneficial near the
//  * end game. My default snake would normally try to follow itself and ignore any
//  * extra holes it might create. This avoiding itself method kinda forces the
//  * snake to fill in that area before considering following itself.
//  *
//  * Regardless, it really makes the early game weird. The snake constantly avoids
//  * itself and doesn't want to cross the path where it was. This is obviously
//  * inconvenient if the apple spawned inside of where the snake was coiled
//  * around.
//  *
//  * It also does not have a lot of incentive to go towards the apple. My guess is
//  * that the solution is optimized for the late game. I will try to penalize
//  * moves more.
//  */
// const config15x15: Configuration = {
// 	avoidanceVisitPenalty: 1.45603279,
// 	avoidanceCoolDown: -1.54382275,
// 	snakePathDecrement: -2.39676678,
// 	snakePathFalloff: 0.20193523,
// 	appleDistanceMultiplier: 0.55573981,
// 	utilityCurvyLengthBack: -0.61106087,
// 	utilityCurvyStraightLength: 0.67539843,
// 	utilityCurvyTurnPenaltyDefault: 0.07314153,
// 	utilityStraightStraightLength: -0.58809785,
// 	utilityStraightTurnBonusDivisor: 1.52554155,
// 	utilityStraightLengthBack: 0.69375705,
// 	sizeOneGroups: 3.119175,
// 	utilityCurvy: -0.20752765,
// 	largestGroupSize: 1.42854342,
// 	utilityStraight: -1.77317312,
// }

// const config20x20New: Configuration = {
// 	avoidanceVisitPenalty: 1.90236328,
// 	avoidanceCoolDown: -1.45268752,
// 	snakePathDecrement: -0.60835096,
// 	snakePathFalloff: 0.70831226,
// 	appleDistanceMultiplier: -0.28692902,
// 	utilityCurvyLengthBack: 1.1320026,
// 	utilityCurvyStraightLength: 1.43071485,
// 	utilityCurvyTurnPenaltyDefault: 1.53294643,
// 	utilityStraightStraightLength: 0.09679877,
// 	utilityStraightTurnBonusDivisor: -0.40132313,
// 	utilityStraightLengthBack: -0.37447691,
// 	sizeOneGroups: 1.71185032,
// 	utilityCurvy: 1.02310666,
// 	largestGroupSize: 0.28944948,
// 	utilityStraight: 1.47237123,
// }
// const config20x20NewNew: Configuration = {
// 	avoidanceVisitPenalty: 1.49086075,
// 	avoidanceCoolDown: -1.82517107,
// 	snakePathDecrement: -0.28992209,
// 	snakePathFalloff: -0.10198221,
// 	appleDistanceMultiplier: 0.22957347,
// 	utilityCurvyLengthBack: -1.27025663,
// 	utilityCurvyStraightLength: 0.17348637,
// 	utilityCurvyTurnPenaltyDefault: -0.21628988,
// 	utilityStraightStraightLength: 1.19201287,
// 	utilityStraightTurnBonusDivisor: 0.32350997,
// 	utilityStraightLengthBack: -0.35172586,
// 	sizeOneGroups: 0.74502754,
// 	utilityCurvy: -1.26572724,
// 	largestGroupSize: 1.77932753,
// 	utilityStraight: 0.6420258,
// }
// /**
//  * Something I notice (I'll change it in V2) is that having a negative avoidance
//  * cooldown makes that cooldown useless
//  */
// const config20x20NewNewNew: Configuration = {
// 	avoidanceVisitPenalty: 3.11702137,
// 	avoidanceCoolDown: -1.76888545,
// 	snakePathDecrement: 0.06952141,
// 	snakePathFalloff: -0.40129675,
// 	appleDistanceMultiplier: 0.06940655,
// 	utilityCurvyLengthBack: -1.33187313,
// 	utilityCurvyStraightLength: -3.00633197,
// 	utilityCurvyTurnPenaltyDefault: 0.68169815,
// 	utilityStraightStraightLength: 1.14101156,
// 	utilityStraightTurnBonusDivisor: 1.02668129,
// 	utilityStraightLengthBack: -2.52211503,
// 	sizeOneGroups: 0.5741448,
// 	utilityCurvy: -0.13925989,
// 	largestGroupSize: 0.94999403,
// 	utilityStraight: -0.23790775,
// }

const DumbFrickinSnake: Configuration = {
	avoidanceVisitPenalty: 1.27459906,
	avoidanceCoolDown: -0.00001916,
	snakePathDecrement: 1.92018873,
	snakePathFalloff: 1.27004166,
	utilityCurvyLengthBack: 0.40808166,
	utilityCurvyStraightLength: 0.13088277,
	utilityCurvyTurnPenaltyDefault: -0.73085239,
	utilityStraightStraightLength: 0.76388628,
	utilityStraightTurnBonusDivisor: -0.0100832,
	utilityStraightLengthBack: -1.47342013,
	sizeOneGroups: -2.67335201,
	utilityCurvy: -1.91413164,
	largestGroupSize: -1.49712939,
	utilityStraight: -1.04408936,
	numGroups: 2.36489483,
	canSeeTail: 0.10500985,
	appleDirectMultiplier: -1.05078949,
	appleTaxiMultiplier: 2.16914237,
}

const configV2: Configuration = {
	avoidanceVisitPenalty: 1.27459906,
	avoidanceCoolDown: -0.00001916,
	snakePathDecrement: 1.92018873,
	snakePathFalloff: 1.27004166,
	utilityCurvyLengthBack: 0.40808166,
	utilityCurvyStraightLength: 0.13088277,
	utilityCurvyTurnPenaltyDefault: -0.73085239,
	utilityStraightStraightLength: 0.76388628,
	utilityStraightTurnBonusDivisor: -0.0100832,
	utilityStraightLengthBack: -1.47342013,
	sizeOneGroups: -2.67335201,
	utilityCurvy: -1.91413164,
	largestGroupSize: -1.49712939,
	utilityStraight: -1.04408936,
	numGroups: 2.36489483,
	canSeeTail: 0.10500985,
	appleDirectMultiplier: -1.05078949,
	appleTaxiMultiplier: 2.16914237,
}


export const defaultConfig: Configuration = configV2;
