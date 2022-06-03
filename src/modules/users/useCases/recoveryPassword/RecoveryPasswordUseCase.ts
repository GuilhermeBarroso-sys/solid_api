import { IUserRepository } from "../../repositories/IUserRepository";
import {hash} from "bcryptjs";
interface IRecoveryPasswordUseCase {
	user_id: string;
	recoveryPassword: string;
	newPassword: string
}
class RecoveryPasswordUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute({user_id, recoveryPassword,newPassword} : IRecoveryPasswordUseCase) {
		const user = await this.userRepository.findUser(user_id);
		if(!user) throw new Error("User not found!");
		if(user.password !== recoveryPassword) throw new Error("Invalid Password Token!");
		const hashedPassword = await hash(newPassword, 10);
		this.userRepository.update(user.id, {
			password: hashedPassword
		});
	}
}

export { RecoveryPasswordUseCase };