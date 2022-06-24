import { Request, Response } from "express";
import { GetAuthenticateUserUseCase } from "./GetAuthenticateUserUseCase";

class GetAuthenticateUserController {
	constructor(private getAuthenticateUserUseCase : GetAuthenticateUserUseCase) {}
	async handle(request: Request, response: Response) {
		const {user_id} = request;
		try {
			const user = await this.getAuthenticateUserUseCase.execute(user_id);
			return response.status(200).json(user);
		} catch(err) {
			return response.status(400).json(err.message);
		}
	}
}

export {GetAuthenticateUserController};