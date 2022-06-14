import { UpdateUserUseCase } from "../UpdateUserUseCase";

describe("testing Update User Use Case" , () => {
	it("Should be update a user", async () => {
		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		const fakeData = {
			username: "test",
			name: "test",
			password: "test"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).resolves.not.toThrow();
	});
	it("Should be update a user", async () => {
		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		const fakeData = {
			username: "test",
			name: "test",
			password: "test"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).resolves.not.toThrow();
	});
	it("Should throw an error because user doesn't exists", async () => {
		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return null;}
		});
		const fakeData = {
			username: "test",
			name: "test",
			password: "test"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).rejects.toThrowError("This user doesn't exist!");
	});
	it("Should throw an error because required params doesn't exist", async () => {
		const updateUserUseCase = new UpdateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};},
			findUser: async () => {return {id: "123",username: "test", email: "123@gmail.com", password: "1234122"};}
		});
		const fakeData = {
			username: null,
			email: null,
			password: null,
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).rejects.toThrowError("Invalid Data! Please, provider at least one the information: [username,email,password]");
	});
});