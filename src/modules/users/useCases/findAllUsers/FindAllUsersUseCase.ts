import { IUserRepository } from "../../repositories/IUserRepository";

interface IFindAllUsersUseCase {
	limit?: string
	offset?: string
}
class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}
	async execute({limit = null, offset = null} : IFindAllUsersUseCase) {
		return await this.userRepository.findAll({limit, offset});
	}
}

export { FindAllUsersUseCase};