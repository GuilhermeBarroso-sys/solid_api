import { UserRepositoryPrisma } from "../../repositories/prisma/UserRepositoryPrisma";
import { FindUserByEmailController } from "./FindUserByEmailController";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";

export function FindUserByEmailFactory() : FindUserByEmailController {
	const userRepository = new UserRepositoryPrisma();
	const userFindUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
	const userFindUserByEmailController = new FindUserByEmailController(userFindUserByEmailUseCase);
	return userFindUserByEmailController;
}