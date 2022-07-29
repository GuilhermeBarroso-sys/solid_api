
import { createThrowError } from "../../../../errors/createThrowError";
import { IUserRepository } from "../../repositories/IUserRepository";

class DestroyManyUsersUseCase {
	constructor(private userRepository : IUserRepository) {}
  
	async execute(queryParamsIds : string) {
		const ids = queryParamsIds.split(",");
		const count = await this.userRepository.destroyMany(ids);
		if(!count) {
			throw createThrowError({
				name: "unprocessableEntity"
			});
		}
	}
}

export { DestroyManyUsersUseCase };