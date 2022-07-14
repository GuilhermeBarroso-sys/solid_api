import { FindAllUsersUseCase } from "../FindAllUsersUseCase";

describe("Find All Users Use Case", () => {
	it("Should be find many users", async () => {
		const findAllUsersUseCase = new FindAllUsersUseCase({
			create: async () => {},
			findAll: async () => {return {...[{id: "123",username: "test", email: "123@gmail.com", password: "1234122"}, {id: "1234",username: "test1", email: "1234@gmail.com", password: "1234122"}]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		await expect(findAllUsersUseCase.execute({})).resolves.not.toThrow();
	});
	it("Should be find one user and your id should be 5", async () => {
		const findAllUsersUseCase = new FindAllUsersUseCase({
			create: async () => {},
			findAll: async () => {return {...[{id: "5",username: "test1", email: "1234@gmail.com", password: "1234122"}]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		await expect(findAllUsersUseCase.execute({limit: "1",offset:"4"})).resolves.not.toThrow();
		const user =  await findAllUsersUseCase.execute({limit: "1",offset:"4"});
		expect(user[0].id).toBe("5");



	});
	it("Should be throw an error because it's invalid params", async () => {
		const findAllUsersUseCase = new FindAllUsersUseCase({
			create: async () => {},
			findAll: async () => {return {...[{id: "123",username: "test", email: "123@gmail.com", password: "1234122"}, {id: "1234",username: "test1", email: "1234@gmail.com", password: "1234122"}]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
destroyMany: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		await expect(findAllUsersUseCase.execute({limit: "notANumber", offset: "notANumber2"})).rejects.toThrow();
		await expect(findAllUsersUseCase.execute({limit: "1", offset: "notANumber"})).rejects.toThrow();
		await expect(findAllUsersUseCase.execute({limit: "notANumber", offset: "2"})).rejects.toThrow();

	});
});