import { schema } from "./schema";

export function isValid(params : Record<string,unknown>) {
	const {error} = schema.validate(params);
	if(error) {
		return {error: true, message: error.message};
	} else {
		return {error:false, message: null};
	}
}