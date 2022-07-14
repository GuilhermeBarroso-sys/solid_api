import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { DestroyManyUsersController } from "./DestroyManyUsersController";
import { DestroyManyUsersUseCase } from "./DestroyManyUsersUseCase";

export function DestroyManyUsersFactory() : DestroyManyUsersController {
	const userRepository = new UserRepositoryPrisma();
	const destroyManyUsersUseCase = new DestroyManyUsersUseCase(userRepository);
	const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
	return destroyManyUsersController;
}