import { Request, Response } from "express";
import { handlerError } from "../../../../errors";
import { isValid } from "../../../../handlers/isValid";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";
import { schema } from "./validation/schema";

class FindAllUsersController {
	constructor(private findAllUsersUseCase : FindAllUsersUseCase) {}
	async handle(request: Request, response: Response) {
		const {user_id, privileges} = request;
		const {error, message} = isValid({privileges}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			const users = await this.findAllUsersUseCase.execute({privileges});
			return response.status(200).json(users);
		} catch(err) {
			const {status, message} = handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export {FindAllUsersController};