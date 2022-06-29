import { Request, Response } from "express";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

class FindAllUsersController {
	constructor(private findAllUsersUseCase : FindAllUsersUseCase) {}
	async handle(request: Request, response: Response) {
		const limit = request.query.limit as string;
		const offset = request.query.offset as string;

		try {
			const users = await this.findAllUsersUseCase.execute({limit,offset});
			return response.status(200).json(users);
		} catch(err) {
			return response.status(400).json(err.message);
		}
	}
}

export {FindAllUsersController};