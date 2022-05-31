import { Request, Response } from "express";
import { FindUserUseCase } from "./FindUserUseCase";

class FindUserController {

	constructor(private findUserUseCase : FindUserUseCase) {}

	async handle(request: Request, response : Response) {
		const {id} = request.params;
		try {
			const user = await this.findUserUseCase.execute(id);
			return response.status(200).json(user);
		} catch( err) {
			return response.status(500).json(err.message);
		}
	}
}

export { FindUserController };