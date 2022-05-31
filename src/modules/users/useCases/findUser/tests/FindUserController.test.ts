import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 } from "uuid";
import { FindUserController } from "../FindUserController";
import { FindUserUseCase } from "../FindUserUseCase";

describe("Testing Find User Controller", () => {
	it("Should be return status code 200", async () => {
		const request = getMockReq({
			params: {
				id: v4().toString()
			}
		});
		const {res : response} = getMockRes();
		const findUserUseCaseMock = new FindUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "", password: ""};}
		}); 
		const findUserControllerMock = new FindUserController(findUserUseCaseMock);
		await findUserControllerMock.handle(request,response);
		expect(request.params).toHaveProperty("id");
		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith({id: "",username: "", email: "",});
	});

	it("Should be throw a error and return status code 500", async () => {
		const request = getMockReq({
			params: {
				id: v4().toString()
			}
		});
		const {res : response} = getMockRes();
		const findUserUseCaseMock = new FindUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {throw new Error("Internal Server Error");}
		}); 
		const findUserControllerMock = new FindUserController(findUserUseCaseMock);
		await findUserControllerMock.handle(request,response);
		expect(request.params).toHaveProperty("id");
		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith("Internal Server Error");
	});
});