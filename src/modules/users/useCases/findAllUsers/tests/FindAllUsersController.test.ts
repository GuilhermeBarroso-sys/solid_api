import { getMockReq, getMockRes } from "@jest-mock/express";
import { FindAllUsersController } from "../FindAllUsersController";
import { FindAllUsersUseCase } from "../FindAllUsersUseCase";

describe("Find All Users Controller", () => {
	it("Should be return a status code 200", async () => {
		const request = getMockReq({
			query: {
				limit:1,
				offset:1
			}
		});
		const {res : response} = getMockRes();

		const findAllUsersUseCase = new FindAllUsersUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		findAllUsersUseCase.execute = async ({limit, offset}) => { return [{id: "123",username: "test", email: "123@gmail.com", password: "1234122"}];};
		const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
		await findAllUsersController.handle(request,response);
		expect(response.status).toBeCalledWith(200);
    
	});

	it("Should be return a status code 400 with an error", async () => {
		const request = getMockReq({
			query: {
				limit:"test",
				offset:"notANumber"
			}
		});
		const {res : response} = getMockRes();

		const findAllUsersUseCase = new FindAllUsersUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		findAllUsersUseCase.execute = async ({limit, offset}) => {throw new Error("error!");};
		const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
		await findAllUsersController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
    
	});
});