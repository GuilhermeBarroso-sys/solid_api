import { MailAdapter } from "../../../../adapters/nodemailer/mailAdapter";
import { IUserRepository } from "../../repositories/IUserRepository";
import ejs from "ejs";
import path from "path";
import { sign } from "jsonwebtoken";
class SendEmailToRecoveryPasswordUseCase {
	constructor(private userRepository : IUserRepository, private mailAdapter : MailAdapter) {}
	async execute(email: string) {
		const user = await this.userRepository.findByEmail(email);
		const viewPath = path.join(path.resolve(), "src", "views", "template", "email", "recoveryPassword", "index.ejs");
		if(!user) throw new Error("This email doesn't exist");
		const passwordToken = sign({password:user.password}, process.env.JWT_SECRET, {
			subject: user.password,
			expiresIn: "1h"
		});
		const signedUrlToRecoveryPassword = `${process.env.FRONT_URL}/${user.id}/${passwordToken}`;
		const body = await ejs.renderFile(viewPath, {signedUrlToRecoveryPassword});
		await this.mailAdapter.send({
			recipient: email,
			subject: "Recovery Password",
			body
		});
		return {
			user_id: user.id,
			passwordToken
		};
	}
}
export { SendEmailToRecoveryPasswordUseCase};