export default interface Configuration {
	avoidanceVisitPenalty: number;
	avoidanceCoolDown: number;
	snakePathDecrement: number;
	snakePathFalloff: number;
	appleDistanceMultiplier: number;

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
}