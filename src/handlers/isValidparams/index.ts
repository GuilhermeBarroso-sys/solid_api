export function isValidParams(params : Array<unknown>) : boolean {
	return params.every(param => (param != undefined && param != null));
}