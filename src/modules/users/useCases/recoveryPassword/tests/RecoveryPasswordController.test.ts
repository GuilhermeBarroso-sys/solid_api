import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 as uuid } from "uuid";
import { RecoveryPasswordController } from "../RecoveryPasswordController";
import { RecoveryPasswordUseCase } from "../RecoveryPasswordUseCase";

describe("Testing Recovery Password Controller", () => {

	it("Should be return status code 204", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: "1234122"};}
		}); 
		const importUserControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(204);
	});
	it("Should be return a User error with status code 400", async () => {
		const request = getMockReq({
			recoveryPassword: "123",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return null;}
		}); 
		const importUserControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(400);
		expect(response.json).toBeCalledWith("User not found!");

	});
	it("Should be return a Token error with status code 400", async () => {
		const request = getMockReq({
			recoveryPassword: "123", // the error has been Throwed because the recoveryPassword doesn't equal user password
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const recoveryPasswordUseCaseMock = new RecoveryPasswordUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: "1234122"};}
		}); 
		const importUserControllerMock = new RecoveryPasswordController(recoveryPasswordUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(400);
		expect(response.json).toBeCalledWith("Invalid Password Token!");

	});
	


});