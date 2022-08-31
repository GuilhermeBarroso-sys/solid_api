import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 as uuid } from "uuid";
import { RecoveryPasswordController } from "../RecoveryPasswordController";
import { RecoveryPasswordUseCase } from "../RecoveryPasswordUseCase";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";
import { Validator } from "../../../../../handlers/Validator";
describe("Testing Recovery Password Controller", () => {

	it("Shouldn't pass in the validator", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some error"
			};
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase(UserRepositoryMock()); 
		const recoveryPasswordControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		await recoveryPasswordControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(400);
	});
	it("Should be return status code 204", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase(UserRepositoryMock()); 
		const recoveryPasswordControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		jest.spyOn(recoveryPasswordUseCaseMock, "execute").mockImplementation(async ()=> {});
		await recoveryPasswordControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(204);
	});
	it("Should be throw an error with status code 500", async () => {
		const request = getMockReq({
			recoveryPassword: "123",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase(UserRepositoryMock()); 
		const recoveryPasswordControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		jest.spyOn(recoveryPasswordUseCaseMock, "execute").mockImplementation(async ()=> {throw new Error("");});
		await recoveryPasswordControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(500);

	});



});