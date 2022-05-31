import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { FindUserController } from "./FindUserController";
import { FindUserUseCase } from "./FindUserUseCase";

export function FindUserFactory() : FindUserController {
	const userRepository = new UserRepositoryPrisma();
	const findUserUseCase = new FindUserUseCase(userRepository);
	const findUserController = new FindUserController(findUserUseCase);
	return findUserController;
}