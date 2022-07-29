import { Request, Response } from "express";
import { handlerError } from "../../../../errors";
import { isValid } from "../../../../handlers/isValid";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { schema } from "./validation/schema";

class CreateUserController {
	constructor(private createUserUseCase : CreateUserUseCase) {}

	async handle(request: Request, response: Response) : Promise<Response> {
		const {username, email,  password, privileges, profilePicture} = request.body;
		const {error,message} = isValid({username, email,  password, privileges, profilePicture}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			await this.createUserUseCase.execute({username, email, password, privileges, profilePicture});
			return response.status(201).send();
		} catch(err) {
			const {message,status} = handlerError(err);
			return response.status(status).json(message);
		}
    
	}
}

export { CreateUserController};