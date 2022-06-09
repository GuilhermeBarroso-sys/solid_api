
import { SendEmailToRecoveryPasswordUseCase } from "../SendEmailToRecoveryPasswordUseCase";

describe("Testing Send Email To Recovery Password Use Case" , () => {
	it("Should be throw an Error because email doesn't exist", async () => {
		const sendEmailToRecoveryPasswordUseCase = new SendEmailToRecoveryPasswordUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return null;},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: "1234122"};}
		}, {
			send: async () => {}
		});
		await expect(sendEmailToRecoveryPasswordUseCase.execute("test@gmail.com")).rejects.toThrowError("This email doesn't exist");
	});
	it("Should be send an email", async () => {
		const sendEmailToRecoveryPasswordUseCase = new SendEmailToRecoveryPasswordUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: "1234122"};}
		}, {
			send: async () => {}
		});
		await expect(sendEmailToRecoveryPasswordUseCase.execute("test@gmail.com")).resolves.not.toThrow();
	});
});