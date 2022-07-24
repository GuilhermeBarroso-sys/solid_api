import { IUserFind, IUserRepository } from "../../repositories/IUserRepository";
import {compare} from "bcryptjs";
import { sign } from "jsonwebtoken";
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
		if(!email && !password) throw new Error("Missing params. Please, provider an email and password params");
		const user = await this.userRepository.findByEmail(email);
		if(!user) throw new Error("This email doesn't exist!");
		const isCorrectPassword = await compare(password, user.password);
		if(!isCorrectPassword) throw new Error("Wrong Password!");
		delete user.password;
		const token = sign(user, process.env.JWT_SECRET, {subject: `${user.id}#${user.privileges}`});
		return {user,token};
	}
}

export {AuthenticateUserUseCase};