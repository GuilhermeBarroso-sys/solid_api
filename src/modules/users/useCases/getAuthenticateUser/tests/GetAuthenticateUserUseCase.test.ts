import { GetAuthenticateUserUseCase } from "../GetAuthenticateUserUseCase";

describe("Testing Get Authenticate User Use Case", () => {
	it("Should be return a user", async () => {
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
		await expect(getAuthenticateUserUseCase.execute("123")).resolves.not.toThrow();
		await expect(getAuthenticateUserUseCase.execute("123")).resolves.toStrictEqual({id: "123",username: "test", email: "123@gmail.com"});
	});
});