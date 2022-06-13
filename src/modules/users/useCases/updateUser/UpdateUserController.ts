import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
	constructor (private updateUserUseCase : UpdateUserUseCase) {}
	async handle(request : Request, response : Response) {
		try {
			const {id} = request.params;
			const {username, email, password} = request.body;
			const data = {
				username,
				email,
				password
			};
			await this.updateUserUseCase.execute({id, data});
			return response.status(204).send();
		} catch (err) {
			return response.status(400).json(err.message);
		}
	}

}

export {UpdateUserController  };