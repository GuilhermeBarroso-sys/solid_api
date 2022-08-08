import { Request, Response } from "express";
import { isValid } from "../../../../handlers/isValid";
import { FindUserUseCase } from "./FindUserUseCase";
import { schema } from "./validation/schema";

class FindUserController {

	constructor(private findUserUseCase : FindUserUseCase) {}

	async handle(request: Request, response : Response) {
		const {id} = request.params;

		try {
			const user = await this.findUserUseCase.execute(id);
			const {error, message} = isValid({id}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			return response.status(200).json(user);
		} catch( err) {
			return response.status(500).json(err.message);
		}
	}
}

export { FindUserController };