export function removeKeys(object: Record<any, any>, keysToBeDestroyed : Array<string>) {
	Object.keys(object).map((key) => 
	{
		console.log("");
		keysToBeDestroyed.includes(key) && delete object[key];

	});
}