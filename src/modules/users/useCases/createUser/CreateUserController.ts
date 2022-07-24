import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { isValid } from "./validation";
import { schema } from "./validation/schema";

class CreateUserController {
	constructor(private createUserUseCase : CreateUserUseCase) {}

	async handle(request: Request, response: Response) : Promise<Response> {
		const {username, email,  password, privileges, profilePicture} = request.body;
		try {
			const {error,message} = isValid({username, email,  password, privileges, profilePicture});
			if(error) {
				return response.status(400).json(message);
			}
			await this.createUserUseCase.execute({username, email, password, privileges, profilePicture});
			return response.status(201).send();
		} catch( err) {
			return response.status(400).json(err.message);
		}
    
	}
}

export { CreateUserController};