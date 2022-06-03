import { Request, Response } from "express";
import { SendEmailToRecoveryPasswordUseCase } from "./SendEmailToRecoveryPasswordUseCase";

class SendEmailToRecoveryPasswordController {
	constructor (private sendEmailToRecoveryPasswordUseCase : SendEmailToRecoveryPasswordUseCase) {}
	async handle(request: Request, response: Response) {
		const {email} = request.body;
		try {
			const recoveryData = await this.sendEmailToRecoveryPasswordUseCase.execute(email);
			return response.status(200).json(recoveryData);
		} catch(err) {
			return response.status(400).json(err.message);
		}
	}
}

export { SendEmailToRecoveryPasswordController };