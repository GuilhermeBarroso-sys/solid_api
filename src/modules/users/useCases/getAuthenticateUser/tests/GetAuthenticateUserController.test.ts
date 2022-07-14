import { getMockReq, getMockRes } from "@jest-mock/express";
import { GetAuthenticateUserController } from "../GetAuthenticateUserController";
import { GetAuthenticateUserUseCase } from "../GetAuthenticateUserUseCase";

describe("Testing Get Authenticate User Controller", () => {
	it("Should be return a response with status code 200", async () => {
		const request = getMockReq({
			user_id: "123"
		});
		const {res : response} = getMockRes();
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		getAuthenticateUserUseCase.execute = async (user_id : string) => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};};
		const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
		await getAuthenticateUserController.handle(request, response);
		expect(response.status).toBeCalledWith(200);
		expect(response.json).not.toBeNull();
	});
	it("Should be return a throw error with status code 400", async () => {
		const request = getMockReq({
			user_id: null
		});
		const {res : response} = getMockRes();
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		getAuthenticateUserUseCase.execute = async (user_id : string) => {throw Error("");};
		const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
		await getAuthenticateUserController.handle(request, response);
		expect(response.status).toBeCalledWith(400);
	});
});