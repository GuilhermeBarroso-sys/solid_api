import { IUserRepository } from "../../repositories/IUserRepository";

class FindUserByEmailUseCase {
	constructor( private userRepository : IUserRepository) {}
	async execute(email : string) {
		const user = await this.userRepository.findByEmail(email);
		delete user?.password;
		return user;
	}
}
export { FindUserByEmailUseCase };