import { IUserRepository } from "../../repositories/IUserRepository";

class DestroyUserUseCase {
	constructor (private userRepository : IUserRepository) {}
	async execute(id: string) {
		const userExists = await this.userRepository.findUser(id);
		if(!userExists) throw new Error("This user doesn't exist!");
		await this.userRepository.destroy(id);
	}
}

export { DestroyUserUseCase };