import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export function UpdateUserFactory () : UpdateUserController {
	const userRepository = new UserRepositoryPrisma();
	const updateUserUseCase = new UpdateUserUseCase(userRepository);
	const updateUserController = new UpdateUserController(updateUserUseCase);
	return updateUserController;
}