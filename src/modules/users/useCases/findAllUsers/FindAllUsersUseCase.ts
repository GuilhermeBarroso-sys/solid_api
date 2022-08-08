import { Prisma, Privileges } from "@prisma/client";
import { Sql } from "@prisma/client/runtime";
import SQL from "sql-template-strings";
import { IUserRepository, TPrivileges } from "../../repositories/IUserRepository";

interface IFindAllUsersUseCase {
	privileges: TPrivileges
}
class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}
	async execute({privileges} : IFindAllUsersUseCase) {
		const query = privileges === "root" 
			? SQL`SELECT id,username,email,privileges FROM users WHERE privileges != 'root' ` 
			: SQL`SELECT id,username,email,privileges FROM users WHERE privileges NOT IN('root', 'admin')`;
		const allUsers = await this.userRepository.custom(query);
		return allUsers;
	}
}

export { FindAllUsersUseCase};