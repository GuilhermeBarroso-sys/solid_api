import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { FindAllUsersController } from "./FindAllUsersController";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

export function FindAllUsersFactory() : FindAllUsersController{
	const userRepository = new UserRepositoryPrisma();
	const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
	const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
	return findAllUsersController;
}