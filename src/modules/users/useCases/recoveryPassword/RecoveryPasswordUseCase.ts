import { IUserRepository } from "../../repositories/IUserRepository";
import {hash} from "bcryptjs";
import { createThrowError } from "../../../../errors/createThrowError";
interface IRecoveryPasswordUseCase {
	user_id: string;
	recoveryPassword: string;
	newPassword: string
}
class RecoveryPasswordUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute({user_id, recoveryPassword,newPassword} : IRecoveryPasswordUseCase) {
		const user = await this.userRepository.findUser(user_id);
		if(!user) throw createThrowError({name: "unprocessableEntity"});
		if(user.password !== recoveryPassword) throw  createThrowError({name: "unauthorized"});
		const hashedPassword = await hash(newPassword, 10);
		await this.userRepository.update(user.id, {
			password: hashedPassword
		});
	}
}

export { RecoveryPasswordUseCase };