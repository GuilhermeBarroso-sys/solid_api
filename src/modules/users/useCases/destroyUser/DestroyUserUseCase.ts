import { createThrowError } from "../../../../errors/createThrowError";
import { IUserRepository } from "../../repositories/IUserRepository";

class DestroyUserUseCase {
	constructor (private userRepository : IUserRepository) {}
	async execute(id: string) {
		await this.userRepository.destroy(id);
	}
}

export { DestroyUserUseCase };