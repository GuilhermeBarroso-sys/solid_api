import { Request, Response } from "express";
import { DestroyManyUsersUseCase } from "./DestroyManyUsersUseCase";

class DestroyManyUsersController {
	constructor (private destroyManyUsersUseCase : DestroyManyUsersUseCase) {}
	async handle(request: Request, response: Response) {
		try {
			const ids = request.query.ids as string;
			console.log(ids);
			await this.destroyManyUsersUseCase.execute(ids);
			return response.status(204).send();
		} catch(err) {
			return response.status(400).json(err.message);
		}
	}
}

export { DestroyManyUsersController };