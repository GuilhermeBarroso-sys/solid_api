import { isValidParams } from "../../../../handlers/isValidparams";
import { IUserRepository } from "../../repositories/IUserRepository";

class DestroyManyUsersUseCase {
	constructor(private userRepository : IUserRepository) {}
  
	async execute(queryParamsIds : string) {
		const isValid = isValidParams([queryParamsIds]);
		if(!isValid) {
			throw new Error("Invalid param!");
		}
		const ids = queryParamsIds.split(",");
		await this.userRepository.destroyMany(ids);
	}
}

export { DestroyManyUsersUseCase };