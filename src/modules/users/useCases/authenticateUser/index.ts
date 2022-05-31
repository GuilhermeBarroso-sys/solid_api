import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export function AuthenticateUserFactory() : AuthenticateUserController {
	const  usersRepository = new UserRepositoryPrisma();
	const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
	const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);
	return authenticateUserController; 
}