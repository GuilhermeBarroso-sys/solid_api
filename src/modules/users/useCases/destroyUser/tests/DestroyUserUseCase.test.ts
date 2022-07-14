import { DestroyUserUseCase } from "../DestroyUserUseCase";

describe("Testing Destroy User Use Case", () => {
	it("Should be destroy a user", async () => {
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
		await expect(destroyUserUseCase.execute("123")).resolves.not.toThrow();
	});

	it("Should throw a error because user doesn't exists", async () => {
		const destroyUserUseCase = new DestroyUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return null;}
		});
		await expect(destroyUserUseCase.execute("123")).rejects.toThrowError("This user doesn't exist!");
	});
});