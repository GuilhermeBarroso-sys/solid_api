import { IUserEdit, IUserRepository } from "../../repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { createThrowError } from "../../../../errors/createThrowError";
interface IUpdateUser {
	id: string
	data: IUserEdit
}
class UpdateUserUseCase {
	constructor (private userRepository : IUserRepository) {}
	async execute({id, data} : IUpdateUser ) {

		const userThatGonnaUpdating = await this.userRepository.findUser(id);
		if(data.authenticateUserPrivileges != "root") {

			if(userThatGonnaUpdating.privileges == "root" || userThatGonnaUpdating.privileges == "admin") {
				const error =  createThrowError({name: "forbidden", message: "Insufficient Permission"});
				throw error;
			}

			if(data.authenticateUserPrivileges != "admin" && userThatGonnaUpdating.id !==  data.authenticateUserId) {
				const error =  createThrowError({name: "forbidden", message: "Insufficient Permission"});
				throw error;
			}
      
		}

		if(data.password) data.password = await bcrypt.hash(data.password, 10);
		if(data.authenticateUserPrivileges === "user" || data.authenticateUserPrivileges === "vip") delete data.privileges;
		delete data.authenticateUserPrivileges;
		delete data.authenticateUserId;
		await this.userRepository.update(id, data);
	}
}

export { UpdateUserUseCase };