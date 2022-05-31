import {hashSync} from "bcryptjs";
import { isValidParams } from "../../../../handlers/isValidparams";
import { IUserRepository } from "../../repositories/IUserRepository";
interface IRequest {
	username: string;
	email : string;
	password: string;
}
class CreateUserUseCase {
	constructor (private userRepository : IUserRepository ) {}
	async execute({username,email,password} : IRequest)  {    
		if(!isValidParams([username,email,password])) throw new Error(`Missing required params!`);
		const emailAlreadyExists = await this.userRepository.findByEmail(email);
		if(emailAlreadyExists) throw new Error(`This email already exists!`);
		await this.userRepository.create({
			username,
			email,
			password : hashSync(password, 10)
		});
	}
}

export  { CreateUserUseCase };