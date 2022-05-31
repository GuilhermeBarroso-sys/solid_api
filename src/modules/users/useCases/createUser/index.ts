import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export function createUserFactory() : CreateUserController  {
	const usersRepository = new UserRepositoryPrisma();
	const createUserUseCase = new CreateUserUseCase(usersRepository);
	const createUserController = new CreateUserController(createUserUseCase);
	return createUserController;
}