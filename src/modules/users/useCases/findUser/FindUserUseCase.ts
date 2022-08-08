import SQL from "sql-template-strings";
import { IUserRepository } from "../../repositories/IUserRepository";
class FindUserUseCase {
	constructor(private userRepository : IUserRepository) {}

	async execute(id : string) {
		const user = await this.userRepository.custom(SQL`SELECT id, username,email, privileges  FROM users WHERE id=${id}`);
		return user[0];
	}
}

export { FindUserUseCase };