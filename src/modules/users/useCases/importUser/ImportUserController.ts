import { Request, Response } from "express";
import { Validator } from "../../../../handlers/Validator";
import { ImportUserUseCase } from "./ImportUserUseCase";
import { schema } from "./validation/schema";

class ImportUserController {
	constructor(private importUserUseCase : ImportUserUseCase) {}
	async handle(request: Request, response: Response) {
		const {file} = request;
		const {error,message} = Validator.isValid({file}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try { 
			await this.importUserUseCase.execute(file);
			return response.status(201).send();
		} catch(err) {
			return response.status(400).json(err.message);
		}
	} 
}

export {ImportUserController};