export function removeKeys(object: Record<any, any>, keysToBeDestroyed : Array<string>) {
	Object.keys(object).map((key) => {
		keysToBeDestroyed.includes(key) && delete object[key];
	});
}