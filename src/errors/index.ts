import { commonErrors } from "./commonErrors";

export class Error {
	static handlerError(err : Record<string, unknown>){
		const errorName = err.code ? err.code : err.name; 
		const knownError = commonErrors.find((error) =>  error.errorName == errorName);
		const serverError = 	{
			errorName: "ServerError",
			status: 500,
			message: "Server error"
		};
		return knownError ? knownError : serverError;
  
	}
} 