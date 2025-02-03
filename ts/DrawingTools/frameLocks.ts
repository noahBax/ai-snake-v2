export var TICK_LOCK = true;
export function unlock_tick(): void {
	TICK_LOCK = false;
}
export function lock_tick(): void {
	TICK_LOCK = true;
}