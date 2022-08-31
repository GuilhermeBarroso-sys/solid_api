import { Request, Response } from "express";
import { Validator } from "../../../../handlers/Validator";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";
import { schema } from "./validation/schema";

class FindUserByEmailController {
	constructor(private findUserByEmailUseCase : FindUserByEmailUseCase) {}
	async handle(request : Request, response : Response) {
		const {email} = request.params;
		const {error, message} = Validator.isValid({email}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			const user = await this.findUserByEmailUseCase.execute(email);
			return response.status(200).json(user); 
		} catch ( err) {
			return response.status(500).json("Server Error");
		}
	}
}

export { FindUserByEmailController };