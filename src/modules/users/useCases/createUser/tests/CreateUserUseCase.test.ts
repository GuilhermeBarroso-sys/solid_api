import {IUser} from "../../../repositories/IUserRepository";
import { CreateUserUseCase } from "../CreateUserUseCase";
describe("Testing User Create", () => {
	const createUserUseCaseMock = new CreateUserUseCase({
		create: async () => {},
		findAll: async () => {return {...[]}; },
		createMany: async () => {throw new Error("error");},
		destroy: async () => {},
		destroyMany: async () => {},
		update: async () => {},
		findByEmail: async () => {return null;},
		findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
	}); 
	it("should be able create a user", async () => {
		const userMock : IUser = {
			username: "John",
			email: "testMock@gmail.com",
			password: "supersecret"
		};
		await expect(createUserUseCaseMock.execute(userMock)).resolves.not.toThrow();
	});

	it("shouldn't be able create a user", async () => {

		const userErrorMock : IUser = {
			username: undefined,
			email: undefined,
			password: undefined,
		};
		await expect(createUserUseCaseMock.execute(userErrorMock)).rejects.toThrowError("Missing required params!");
	});

});