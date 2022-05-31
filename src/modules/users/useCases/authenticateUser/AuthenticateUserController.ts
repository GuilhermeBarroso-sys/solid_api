import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
class AuthenticateUserController {
	constructor (private authenticateUserUseCase : AuthenticateUserUseCase) {} 
	async handle(request: Request, response: Response) {
		const {email,password} = request.body;
		try {
			const {user,token} = await this.authenticateUserUseCase.execute({email,password});
			return response.status(200).json({user, token});
		} catch ( err ) {
			return response.status(401).json(err.message);
		}
	}
}

export { AuthenticateUserController };