import { getMockReq, getMockRes } from "@jest-mock/express";
import { DestroyUserController } from "../DestroyUserController";
import { DestroyUserUseCase } from "../DestroyUserUseCase";

describe("testign destroy user controller", ()=> {
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

		const destroyUserUseCase = new DestroyUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		destroyUserUseCase.execute = async () => {};
		const updateUserController = new DestroyUserController(destroyUserUseCase);
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

		const destroyUserUseCase = new DestroyUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		destroyUserUseCase.execute = async () => {throw new Error("");};
		const updateUserController = new DestroyUserController(destroyUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(400);

	});
});