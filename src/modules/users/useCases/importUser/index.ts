import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { ImportUserController } from "./ImportUserController";
import { ImportUserUseCase } from "./ImportUserUseCase";

export function ImportUserFactory() : ImportUserController {
	const userRepository = new UserRepositoryPrisma();
	const importUserUseCase = new ImportUserUseCase(userRepository);
	const importUserController = new ImportUserController(importUserUseCase);
	return importUserController;
}