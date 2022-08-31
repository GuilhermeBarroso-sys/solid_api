import { Request, Response } from "express";
import { Error } from "../../../../errors";
import { Validator } from "../../../../handlers/Validator";
import { RecoveryPasswordUseCase } from "./RecoveryPasswordUseCase";
import { schema } from "./validation/schema";

class RecoveryPasswordController {
	constructor(private recoveryPasswordUseCase : RecoveryPasswordUseCase) {}

	async handle(request: Request, response : Response) {
		try {
			const { recoveryPassword } = request;
			const { newPassword, user_id } = request.body;
			const {error, message} =  Validator.isValid({newPassword, user_id}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			await this.recoveryPasswordUseCase.execute({user_id, recoveryPassword, newPassword});
			return response.status(204).send();
		} catch( err) {
			const {status, message} = Error.handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export { RecoveryPasswordController};