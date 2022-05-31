import { Request, Response } from "express";
import { ImportUserUseCase } from "./ImportUserUseCase";

class ImportUserController {
	constructor(private importUserUseCase : ImportUserUseCase) {}
	async handle(request: Request, response: Response) {
		const {file} = request;
		
		try { 
			await this.importUserUseCase.execute(file);
			return response.status(201).send();
		} catch(err) {
			return response.status(400).json(err.message);
		}
	} 
}

export {ImportUserController};