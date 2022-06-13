import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { DestroyUserController } from "./DestroyUserController";
import { DestroyUserUseCase } from "./DestroyUserUseCase";

export function DestroyUserFactory() : DestroyUserController {
	const userRepository = new UserRepositoryPrisma();
	const destroyUserUseCase = new DestroyUserUseCase(userRepository);
	const destroyUserController = new DestroyUserController(destroyUserUseCase);
	return destroyUserController;
}