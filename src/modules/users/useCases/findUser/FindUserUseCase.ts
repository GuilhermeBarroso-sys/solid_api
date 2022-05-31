import { IUserRepository } from "../../repositories/IUserRepository";

class FindUserUseCase {
	constructor(private userRepository : IUserRepository) {}

	async execute(id: string) {
		const user = await this.userRepository.findUser(id);
		user && delete user.password;
		return user;
	}
}

export { FindUserUseCase };