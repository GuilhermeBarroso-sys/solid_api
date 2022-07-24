import { IUserEdit, IUserRepository } from "../../repositories/IUserRepository";
import bcrypt from "bcryptjs";
interface IUpdateUser {
	id: string
	data: IUserEdit
}
class UpdateUserUseCase {
	constructor (private userRepository : IUserRepository) {}
	async execute({id, data} : IUpdateUser ) {
		const userExists = await this.userRepository.findUser(id);
		if(!userExists) throw new Error("This user doesn't exist!");
		const {username,email,password, privileges} = data;
		if(!username && !email && !password && !privileges) throw new Error("Invalid Data! Please, provider at least one the information: [username,email,password]");
		if(password) data.password = await bcrypt.hash(password, 10);
		await this.userRepository.update(id, data);
	}
}

export { UpdateUserUseCase };