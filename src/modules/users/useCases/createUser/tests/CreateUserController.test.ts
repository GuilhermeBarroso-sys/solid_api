import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { CreateUserController } from "../CreateUserController";
import { CreateUserUseCase } from "../CreateUserUseCase";
import {getMockReq, getMockRes} from "@jest-mock/express";
import { Validator } from "../../../../../handlers/Validator";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
describe("Testing Create User Controller", () => {
  
	it("Shouldn't pass in the validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some error"
			};
		});
		const createUserUseCase = new CreateUserUseCase( UserRepositoryMock()); 
		jest.spyOn(createUserUseCase, "execute").mockImplementation(async () => {
			return null;
		});
		const request = getMockReq({
			body: {
				email: null,
				password: "1234123"
			}
		});
		const {res : response} = getMockRes();
		const createUserController = new CreateUserController(createUserUseCase);
		await expect(createUserController.handle(request, response)).resolves.not.toThrow();
		expect(response.status).toHaveBeenCalledWith(400);
	});

	it("Should to be able to create a user", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const createUserUseCase = new CreateUserUseCase( UserRepositoryMock()); 
		jest.spyOn(createUserUseCase, "execute").mockImplementation(async () => {
			return null;
		});
		const request = getMockReq({
			body: {
				username: "test",
				email: "g@gmail.com",
				password: "1234123",
				privileges: "admin",
				profilePicture: null
			}
		});
		const createUserController = new CreateUserController(createUserUseCase);
		const {res : response} = getMockRes();
		await expect(createUserController.handle(request, response)).resolves.not.toThrow();
		expect(response.status).toHaveBeenCalledWith(201);
	});

	it("Should to be return an error with status code 500", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const createUserUseCase = new CreateUserUseCase( UserRepositoryMock(null, true)); 
		jest.spyOn(createUserUseCase, "execute").mockImplementation(async () => {
			throw new Error("");
		});
		const request = getMockReq({
			body: {
				username: "test",
				email: "g@gmail.com",
				password: "1234123",
				privileges: "admin",
				profilePicture: null
			}
		});
		const createUserController = new CreateUserController(createUserUseCase);
		const {res : response} = getMockRes();
		await expect(createUserController.handle(request, response)).resolves;
		expect(response.status).toHaveBeenCalledWith(500);
	});
});