import { Request, Response } from "express";
import { Error } from "../../../../errors";
import { Validator } from "../../../../handlers/Validator";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { schema } from "./validation/schema";

class CreateUserController {
	constructor(private createUserUseCase : CreateUserUseCase) {}

	async handle(request: Request, response: Response) : Promise<Response> {
		const {username, email,  password, privileges, profilePicture} = request.body;
		const {error,message} = Validator.isValid({username, email,  password, privileges, profilePicture}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			await this.createUserUseCase.execute({username, email, password, privileges, profilePicture});
			return response.status(201).send();
		} catch(err) {
			const {message,status} = Error.handlerError(err);
			return response.status(status).json(message);
		}
    
	}
}

export { CreateUserController};