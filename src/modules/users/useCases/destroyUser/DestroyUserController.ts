import { Request, Response } from "express";
import { DestroyUserUseCase } from "./DestroyUserUseCase";

class DestroyUserController {
	constructor (private destroyUserUseCase : DestroyUserUseCase) {}
	async handle(request : Request, response : Response) {
		try {
			const {id} = request.params;
			await this.destroyUserUseCase.execute(id);
			return response.status(204).send();
		} catch (err) {
			return response.status(400).json(err.message);
		}
	}
}

export { DestroyUserController};