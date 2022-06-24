import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { GetAuthenticateUserController } from "./GetAuthenticateUserController";
import { GetAuthenticateUserUseCase } from "./GetAuthenticateUserUseCase";

export function GetAuthenticateUserFactory() {
	const userRepository = new UserRepositoryPrisma();
	const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase(userRepository);
	const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
	return getAuthenticateUserController;
}