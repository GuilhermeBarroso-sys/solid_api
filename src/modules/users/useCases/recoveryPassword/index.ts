import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { RecoveryPasswordController } from "./RecoveryPasswordController";
import { RecoveryPasswordUseCase } from "./RecoveryPasswordUseCase";

export function RecoveryPasswordFactory() : RecoveryPasswordController {
	const userRepository = new UserRepositoryPrisma();
	const recoveryPasswordUseCase = new RecoveryPasswordUseCase(userRepository);
	const recoveryPasswordController = new RecoveryPasswordController(recoveryPasswordUseCase);
	return recoveryPasswordController;
}