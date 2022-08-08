import { Request, Response } from "express";
import { isValid } from "../../../../handlers/isValid";
import { GetAuthenticateUserUseCase } from "./GetAuthenticateUserUseCase";
import { schema } from "./validation/schema";

class GetAuthenticateUserController {
	constructor(private getAuthenticateUserUseCase : GetAuthenticateUserUseCase) {}
	async handle(request: Request, response: Response) {
		const {user_id} = request;
		const {error, message} = isValid({user_id}, schema);
		if(error) {
			return response.status(401).json(message);
		}
		try {
			const user = await this.getAuthenticateUserUseCase.execute(user_id);
			return response.status(200).json(user);
		} catch(err) {
			return response.status(400).json(err.message);
		}
	}
}

export {GetAuthenticateUserController};