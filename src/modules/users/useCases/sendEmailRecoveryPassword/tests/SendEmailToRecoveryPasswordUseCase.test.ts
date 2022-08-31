
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { SendEmailToRecoveryPasswordUseCase } from "../SendEmailToRecoveryPasswordUseCase";

describe("Testing Send Email To Recovery Password Use Case" , () => {
	it("Should throw an Error because email doesn't exist", async () => {
		const sendEmailToRecoveryPasswordUseCase = new SendEmailToRecoveryPasswordUseCase(UserRepositoryMock(null), {
			send: async () => {}
		});
		await expect(sendEmailToRecoveryPasswordUseCase.execute("test@gmail.com")).rejects.toThrow();
	});
	it("Should be send an email", async () => {
		const sendEmailToRecoveryPasswordUseCase = new SendEmailToRecoveryPasswordUseCase(UserRepositoryMock(), {
			send: async () => {}
		});
		await expect(sendEmailToRecoveryPasswordUseCase.execute("test@gmail.com")).resolves.not.toThrow();
	});
});