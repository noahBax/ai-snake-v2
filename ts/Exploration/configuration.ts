export default interface Configuration {
	avoidanceVisitPenalty: number;
	avoidanceCoolDown: number;
	snakePathDecrement: number;
	snakePathFalloff: number;

	utilityCurvy: number;
	utilityCurvyLengthBack: number;
	utilityCurvyStraightLength: number;
	utilityCurvyTurnPenaltyDefault: number;
	utilityStraight: number;
	utilityStraightStraightLength: number;
	utilityStraightTurnBonusDivisor: number;
	utilityStraightLengthBack: number;
	sizeOneGroups: number;
	largestGroupSize: number;

	numGroups: number;
	canSeeTail: number;
	appleDirectMultiplier: number;
	appleTaxiMultiplier: number;
}