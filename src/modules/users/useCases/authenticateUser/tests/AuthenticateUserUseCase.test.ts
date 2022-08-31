import { UserRepositoryPrisma } from "../../../repositories/prisma/UserRepositoryPrisma";
import {IUser} from "../../../repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import {hash, hashSync} from "bcryptjs";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";

describe("Testing User Create", () => {
	it("Should to be throw an error because user doesn't exist", async () => {
		const userMock  = {
			email: undefined,
			password: undefined,

		};
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase(UserRepositoryMock(null)); 
		await expect(authenticateUserUseCaseMock.execute(userMock)).rejects.toThrow();
	});

	it("Should to be throw an error because the user password is wrong", async () => {
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase(UserRepositoryMock({
			password: "123"
		})); 
		const userErrorMock = {
			email: "test@gmail.com",
			password: "1234123",
		};
		await expect(authenticateUserUseCaseMock.execute(userErrorMock)).rejects.toThrow();
	});
	it("should to be return a user and token", async () => {
		jest.spyOn(bcrypt, "compare").mockImplementation(async () => {
			return true;
		});
		const authenticateUserUseCaseMock = new AuthenticateUserUseCase(UserRepositoryMock()); 
		const userErrorMock = {
			email: "123",
			password: await hash("123", 1),
		};
		await expect(authenticateUserUseCaseMock.execute(userErrorMock)).resolves.not.toThrow();
	});


});