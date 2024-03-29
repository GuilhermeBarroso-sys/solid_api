import { Request, Response } from "express";
import { Error } from "../../../../errors";
import {  Validator } from "../../../../handlers/Validator";
import { DestroyManyUsersUseCase } from "./DestroyManyUsersUseCase";
import { schema } from "./validation/schema";

class DestroyManyUsersController {
	constructor (private destroyManyUsersUseCase : DestroyManyUsersUseCase) {}
	async handle(request: Request, response: Response) {
		try {
			const ids = request.query.ids as string;
			const {error, message} = Validator.isValid({ids}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			await this.destroyManyUsersUseCase.execute(ids);
			return response.status(204).send();
		} catch(err) {

			const {status, message} = Error.handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export { DestroyManyUsersController };