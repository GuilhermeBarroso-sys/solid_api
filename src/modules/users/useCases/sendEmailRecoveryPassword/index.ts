import { NodemailerMailAdapter } from "../../../../adapters/nodemailer/NodemailerMailAdapter";
import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { SendEmailToRecoveryPasswordController } from "./SendEmailToRecoveryPasswordController";
import { SendEmailToRecoveryPasswordUseCase } from "./SendEmailToRecoveryPasswordUseCase";

export function SendEmailToRecoveryPasswordFactory() : SendEmailToRecoveryPasswordController {
	const userRepository = new UserRepositoryPrisma();
	const mailAdapter = new NodemailerMailAdapter();
	const sendEmailToRecoveryPasswordUseCase = new SendEmailToRecoveryPasswordUseCase(userRepository, mailAdapter);
	const sendEmailToRecoveryPasswordController = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCase);
	return sendEmailToRecoveryPasswordController;
}