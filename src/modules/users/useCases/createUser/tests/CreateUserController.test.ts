import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { CreateUserController } from "../CreateUserController";
import { CreateUserUseCase } from "../CreateUserUseCase";
import {getMockReq, getMockRes} from "@jest-mock/express";
describe("Testing Create User Controller", () => {
  
	it("Should be able return a response with status Code 201", async () => {
		const createUserUseCaseMock = new CreateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return null;}, //this throw a error
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
		}); 
		const request = getMockReq({
			body: {
				username: "John",
				email:"userMockwfaawfwfawfawfaawfwfa@gmail.com",
				password: "SuperSecret"
			}
		});
		const {res : response} = getMockRes();
		const createUserController = new CreateUserController(createUserUseCaseMock);
		await expect(createUserController.handle(request, response)).resolves.not.toThrow();
		expect(response.status).toHaveBeenCalledWith(201);
		expect(response.send).toHaveBeenCalled();
	});

	it("should return a throw error with status Code 400", async () => {
		const createUserUseCaseMock = new CreateUserUseCase({
			create: async () => {throw new Error("error");},
			createMany: async () => {throw new Error("error");},
			findByEmail: async () => {return {id: "",username: "", email: "", password: ""};},
			findAll: async () => {return {...[]}; },
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
		}); 
		const request = getMockReq({body: {
			username: "John",
			email:"userMock@gmail.com",
			password: "SuperSecret"
		}});
		const { res : response} = getMockRes();
		const createUserController = new CreateUserController(createUserUseCaseMock);
		await createUserController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(400);
		expect(response.json).toHaveBeenCalledWith("This email already exists!");
	});
});