import { getMockReq, getMockRes } from "@jest-mock/express";
import { UpdateUserController } from "../UpdateUserController";
import { UpdateUserUseCase } from "../UpdateUserUseCase";

describe("testing Update User Controller", () => {
	it("Should be return status code 204" , async () => {
		const request = getMockReq({
			params: {
				id: "123"
			},
			body: {
				username: "test",
				email:    "test@gmail.com",
				password: "test"
			}
		});
		const {res : response} = getMockRes();

		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		updateUserUseCase.execute = async () => {};
		const updateUserController = new UpdateUserController(updateUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(204);

	});
	it("Should be return status code 400 with throw error" , async () => {
		const request = getMockReq({
			params: {
				id: "123"
			},
			body: {
				username: null,
				email:    null,
				password: null
			}
		});
		const {res : response} = getMockRes();

		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		updateUserUseCase.execute = async () => {throw new Error("");};
		const updateUserController = new UpdateUserController(updateUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(400);

	});
});