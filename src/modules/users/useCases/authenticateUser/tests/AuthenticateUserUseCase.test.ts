import { UserRepositoryPrisma } from "../../../repositories/prisma/UserRepositoryPrisma";
import {IUser} from "../../../repositories/IUserRepository";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import {hash, hashSync} from "bcryptjs";
describe("Testing User Create", () => {
	it("should be throw a missing params error", async () => {
		const userMock : IUser = {
			username: undefined,
			email: undefined,
			password: undefined
		};
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return null;},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		await expect(authenticateUserUseCaseMock.execute(userMock)).rejects.toThrowError("Missing params. Please, provider a email and password params");
	});

	it("shouldn't be able authenticate a user because email doesn't exist", async () => {
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return null;},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const userErrorMock = {
			email: "123",
			password: "1234123",
		};
		await expect(authenticateUserUseCaseMock.execute(userErrorMock)).rejects.toThrowError("This email doesn't exist!");
	});
	it("shouldn't be able authenticate a user because password is wrong", async () => {
		const hashedPassword = await hash("1234123", 1);
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: hashedPassword};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const userErrorMock = {
			email: "123",
			password: "123",
		};
		await expect(authenticateUserUseCaseMock.execute(userErrorMock)).rejects.toThrowError("Wrong Password!");
	});
	it("should be able authenticate a user ", async () => {
		const hashedPassword = await hash("1234123", 1);
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: hashedPassword};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const userErrorMock = {
			email: "123",
			password: "1234123",
		};
		await expect(authenticateUserUseCaseMock.execute(userErrorMock)).resolves.not.toThrow();
	});

});