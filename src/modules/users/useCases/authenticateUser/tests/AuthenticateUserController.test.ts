import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";
import {getMockReq, getMockRes} from "@jest-mock/express";
import { AuthenticateUserController } from "../AuthenticateUserController";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { hash } from "bcryptjs";
import { IUser, IUserRepository } from "../../../repositories/IUserRepository";
import { Validator } from "../../../../../handlers/Validator";
import {UserMock} from "../../../../../mocks/users/UserMock";
import { createThrowError } from "../../../../../errors/createThrowError";
import { Error } from "../../../../../errors";

describe("Testing Create User Controller", () => {

	it("Shouldn't pass in the validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some error"
			};
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase( UserRepositoryMock()); 
		jest.spyOn(authenticateUserUseCase, "execute").mockImplementation(async () => {
			return null;
		});
		const request = getMockReq({
			body: {
				email: "John@gmail.com",
				password: "1234123"
			}
		});
		const {res : response} = getMockRes();
		const createUserController = new AuthenticateUserController(authenticateUserUseCase);
		await expect(createUserController.handle(request, response)).resolves.not.toThrow();
		expect(response.status).toHaveBeenCalledWith(400);
	});

	it("should return status code 200", async () => {
		// Error: Wrong password

		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase( UserRepositoryMock()); 
    
		jest.spyOn(authenticateUserUseCase, "execute").mockImplementation(async () => {
			return { user: UserMock(), token: "123" };
		});
		const request = getMockReq({
			body: {
				email: "John@gmail.com",
				password: "41241241241"
			}
		});
		const {res : response} = getMockRes();
		const createUserController = new AuthenticateUserController(authenticateUserUseCase);
		await createUserController.handle(request, response);
		expect(response.status).toHaveBeenCalledWith(200);
	});

	it("should return a throw error with status Code 401", async () => {
		const authenticateUserUseCase = new AuthenticateUserUseCase( UserRepositoryMock()); 
		const request = getMockReq({
			body: {
				email: "John@gmail.com",
				password: "41241241241"
			}
		});
		jest.spyOn(authenticateUserUseCase, "execute").mockImplementation(async () => {
			throw createThrowError({name: "unauthorized"});
		});
		jest.spyOn(Error, "handlerError").mockImplementation(() => {
			return {
				status: 401,
				message: "unauthorized",
				errorName: null
			};
		});
		const {res : response} = getMockRes();
		const createUserController = new AuthenticateUserController(authenticateUserUseCase);
		await createUserController.handle(request, response);
		expect(response.status).toHaveBeenCalledWith(401);
	});

});