import {hashSync} from "bcryptjs";
import { IUserRepository } from "../../repositories/IUserRepository";
interface IRequest {
	username: string;
	email : string;
	password: string;
	privileges: "user" | "vip" | "admin" | "root",
	profilePicture?: string | null
}
class CreateUserUseCase {
  
	constructor (private userRepository : IUserRepository ) {}
	async execute({username,email,password, privileges = "user", profilePicture } : IRequest)  {
		await this.userRepository.create({
			username,
			email,
			password : hashSync(password, 10),
			privileges,
			profilePicture
		});
	}
}

export  { CreateUserUseCase };