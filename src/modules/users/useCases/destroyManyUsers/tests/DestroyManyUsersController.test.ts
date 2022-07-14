import { getMockReq, getMockRes } from "@jest-mock/express";
import { DestroyManyUsersController } from "../DestroyManyUsersController";
import { DestroyManyUsersUseCase } from "../DestroyManyUsersUseCase";

describe("Testing Destroy Many Users Controller" , () => {
	const destroyManyUsersUseCase = new DestroyManyUsersUseCase({
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
		query: {
			ids: "test1,test2,test3"
		}
	});
	const {res : response} = getMockRes();
	it("Should be return a status code 204",  async () => {
		jest.spyOn(destroyManyUsersUseCase, "execute").mockImplementation(async () => {});
		const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
		await destroyManyUsersController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(204);
	});

	it("Should be return a throw Error", async () => {
		jest.spyOn(destroyManyUsersUseCase, "execute").mockImplementation(async () => {throw new Error("Database error");});
		const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
		await destroyManyUsersController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(400);
		expect(response.json).toHaveBeenCalledWith("Database error");
	});
});