export {};

declare global {
	interface Window { 
		tick: VoidFunction;
	}
}