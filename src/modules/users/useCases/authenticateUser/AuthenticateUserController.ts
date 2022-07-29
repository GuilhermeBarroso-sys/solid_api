import { Request, Response } from "express";
import { handlerError } from "../../../../errors";
import { isValid } from "../../../../handlers/isValid";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { schema } from "./validation/schema";
class AuthenticateUserController {
	constructor (private authenticateUserUseCase : AuthenticateUserUseCase) {} 
	async handle(request: Request, response: Response) {
		const {email,password} = request.body;
		const {error,message} = isValid({email, password}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			const {user,token} = await this.authenticateUserUseCase.execute({email,password});
			return response.status(200).json({user, token});
		} catch ( err ) {
			const {message,status} = handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export { AuthenticateUserController };