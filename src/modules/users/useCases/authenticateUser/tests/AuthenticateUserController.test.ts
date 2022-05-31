import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import {getMockReq, getMockRes} from "@jest-mock/express";
import { AuthenticateUserController } from "../AuthenticateUserController";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { hash } from "bcryptjs";
describe("Testing Create User Controller", () => {
  
	it("Should be able return a response with status Code 200", async () => {
		const hashedPassword = await hash("1234123", 1);
		const authenticateUserUseCase = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return {id: "",username: "", email: "", password: hashedPassword};},
			destroy: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
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
		expect(response.status).toHaveBeenCalledWith(200);
	});

	it("should return a throw error with status Code 400 and Wrong Password", async () => {
		// Error: Wrong password
		const hashedPassword = await hash("1234123", 1);
		const authenticateUserUseCase = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return {id: "",username: "", email: "", password: hashedPassword};},
			destroy: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
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
		expect(response.status).toHaveBeenCalledWith(400);
	});

	it("should return a throw error with status Code 400 and invalid email", async () => {
		const authenticateUserUseCase = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return null;},
			destroy: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
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
		expect(response.status).toHaveBeenCalledWith(400);
	});

	it("should return a throw error with status Code 400 and missing required params", async () => {
		const authenticateUserUseCase = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return null;},
			destroy: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
		}); 
		const request = getMockReq({
			body: {
				email: undefined,
				password: undefined
			}
		});
		const {res : response} = getMockRes();
		const createUserController = new AuthenticateUserController(authenticateUserUseCase);
		await createUserController.handle(request, response);
		expect(response.status).toHaveBeenCalledWith(400);
	});
});