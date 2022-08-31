import { Request, Response } from "express";
import { Validator } from "../../../../handlers/Validator";
import { FindUserUseCase } from "./FindUserUseCase";
import { schema } from "./validation/schema";

class FindUserController {

	constructor(private findUserUseCase : FindUserUseCase) {}

	async handle(request: Request, response : Response) {
		const {id} = request.params;

		try {
			const {error, message} = Validator.isValid({id}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			const user = await this.findUserUseCase.execute(id);
			return response.status(200).json(user);
		} catch( err) {
			return response.status(500).json("Server Error");
		}
	}
}

export { FindUserController };