import { Request, Response } from "express";
import { Error } from "../../../../errors";
import { Validator } from "../../../../handlers/Validator";
import { SendEmailToRecoveryPasswordUseCase } from "./SendEmailToRecoveryPasswordUseCase";
import { schema } from "./validation/schema";

class SendEmailToRecoveryPasswordController {
	constructor (private sendEmailToRecoveryPasswordUseCase : SendEmailToRecoveryPasswordUseCase) {}
	async handle(request: Request, response: Response) {
		const {email} = request.body;
		const {error, message} = Validator.isValid({email}, schema);
		if(error) {
			return response.status(400).json(message);
		}
		try {
			const recoveryData = await this.sendEmailToRecoveryPasswordUseCase.execute(email);
			return response.status(200).json(recoveryData);
		} catch(err) {
			const {status, message} = Error.handlerError(err);
			return response.status(status).json(message);
		}
	}
}

export { SendEmailToRecoveryPasswordController };