import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 as uuid } from "uuid";
import { SendEmailToRecoveryPasswordController } from "../SendEmailToRecoveryPasswordController";
import { SendEmailToRecoveryPasswordUseCase } from "../SendEmailToRecoveryPasswordUseCase";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";
import { Validator } from "../../../../../handlers/Validator";
describe("Testing Send Email To Recovery Password Controller", () => {
	it("Shouldn't pass in the validator", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some error"
			};
		});
		const sendEmailToRecoveryPasswordUseCaseMock = new SendEmailToRecoveryPasswordUseCase(UserRepositoryMock(), {
			send: async () => {}
		});
		jest.spyOn(sendEmailToRecoveryPasswordUseCaseMock, "execute").mockImplementation(async () => {
			return {
				passwordToken: "123",
				user_id: "123"
			};
		});
    
		const sendEmailToRecoveryPasswordControllerMock = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCaseMock);
		await sendEmailToRecoveryPasswordControllerMock.handle(request, response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(400);
	});
	it("should be return a status code 200", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const sendEmailToRecoveryPasswordUseCaseMock = new SendEmailToRecoveryPasswordUseCase(UserRepositoryMock(), {
			send: async () => {}
		});
		jest.spyOn(sendEmailToRecoveryPasswordUseCaseMock, "execute").mockImplementation(async () => {
			return {
				passwordToken: "123",
				user_id: "123"
			};
		});
    
		const sendEmailToRecoveryPasswordControllerMock = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCaseMock);
		await sendEmailToRecoveryPasswordControllerMock.handle(request, response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(200);
	});
	it("should be throw an error with status code 500", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const sendEmailToRecoveryPasswordUseCaseMock = new SendEmailToRecoveryPasswordUseCase(UserRepositoryMock(), {
			send: async () => {}
		});
		jest.spyOn(sendEmailToRecoveryPasswordUseCaseMock, "execute").mockImplementation(async () => {
			throw new Error("");
		});
		const sendEmailToRecoveryPasswordControllerMock = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCaseMock);
		await sendEmailToRecoveryPasswordControllerMock.handle(request, response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(500);
	});

});