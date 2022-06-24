import { removeKeys } from "../../../../handlers/removeKeys";
import { IUserRepository } from "../../repositories/IUserRepository";

class GetAuthenticateUserUseCase {
	constructor(private userRepository : IUserRepository) {}
  
	async execute(user_id: string) {
		const user =  await this.userRepository.findUser(user_id);
		removeKeys(user, ["password"]);
		return user;
	}
}

export {GetAuthenticateUserUseCase};