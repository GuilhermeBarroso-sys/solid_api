import { Request, Response } from "express";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";

class FindUserByEmailController {
	constructor(private findUserByEmailUseCase : FindUserByEmailUseCase) {}
	async handle(request : Request, response : Response) {
		const {email} = request.params;
		try {
			const user = await this.findUserByEmailUseCase.execute(email);
			return response.status(200).json(user); 
		} catch ( err) {
			return response.status(400).json(err.message);
		}
	}
}

export { FindUserByEmailController };