import { IUserRepository } from "../../repositories/IUserRepository";

interface IFindAllUsersUseCase {
	limit?: string
	offset?: string
}
class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}
	async execute({limit = undefined, offset = undefined} : IFindAllUsersUseCase) {
		if( (isNaN(parseInt(limit)) && limit != undefined) || (isNaN(parseInt(offset)) && offset != undefined) ) {
			throw new Error("Query params [limit or offset] should be a number");
		}
		const allUsers = await this.userRepository.findAll({
			limit: limit ? parseInt(limit) : undefined,
			offset: offset ? parseInt(offset) : undefined
		});
		return allUsers.map(user => {
			delete user.password;
			return user;
		});
	}
}

export { FindAllUsersUseCase};