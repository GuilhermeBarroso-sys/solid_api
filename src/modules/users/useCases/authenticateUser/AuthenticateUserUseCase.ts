import { IUserFind, IUserRepository } from "../../repositories/IUserRepository";
import {compare} from "bcryptjs";
import { sign } from "jsonwebtoken";
import { createThrowError } from "../../../../errors/createThrowError";
import SQL from "sql-template-strings";
interface IAuthenticateUserUseCase {
	email: string;
	password: string;
}

interface IResponse {
	user: IUserFind
	token: string;
}
class AuthenticateUserUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute({email,password} : IAuthenticateUserUseCase) : Promise<IResponse> {
		// const query = SQL`SELECT id,username FROM users WHERE email = ${email} LIMIT 1`;
		const user = await this.userRepository.findByEmail(email);
		if(!user) {
			throw createThrowError({name: "wrongCredentials"});
		}
		const isCorrectPassword = await compare(password, user.password);
		if(!isCorrectPassword) {
			throw createThrowError({name: "wrongCredentials"});
		}
		delete user.password;
		const token = sign(user, process.env.JWT_SECRET, {subject: `${user.id}#${user.privileges}`, expiresIn: process.env.NODE_ENV != "production" ? "9999d" : "7d"});
		return {user,token};
	}
}

export {AuthenticateUserUseCase};