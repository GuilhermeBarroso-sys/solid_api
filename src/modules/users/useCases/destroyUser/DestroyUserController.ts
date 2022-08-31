import { Request, Response } from "express";
import { Error } from "../../../../errors";
import { Validator } from "../../../../handlers/Validator";
import { DestroyUserUseCase } from "./DestroyUserUseCase";
import { schema } from "./validation/schema";

class DestroyUserController {
	constructor (private destroyUserUseCase : DestroyUserUseCase) {}
	async handle(request : Request, response : Response) {
		try {
			const {id} = request.params;
			const {error, message} = Validator.isValid({id}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			await this.destroyUserUseCase.execute(id);
			return response.status(204).send();
		} catch (err) {	
			const {status, message} = Error.handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export { DestroyUserController};