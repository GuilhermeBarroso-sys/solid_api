import { Request, Response } from "express";
import { RecoveryPasswordUseCase } from "./RecoveryPasswordUseCase";

class RecoveryPasswordController {
	constructor(private recoveryPasswordUseCase : RecoveryPasswordUseCase) {}

	async handle(request: Request, response : Response) {
		try {
			const { recoveryPassword } = request;
			const { newPassword, user_id } = request.body;
			await this.recoveryPasswordUseCase.execute({user_id, recoveryPassword, newPassword});
			return response.status(204).send();
		} catch( err) {
			return response.status(400).json(err.message);
		}
	}
}

export { RecoveryPasswordController};