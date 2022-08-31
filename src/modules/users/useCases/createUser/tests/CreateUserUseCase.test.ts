import { randomUUID } from "crypto";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import {IUser} from "../../../repositories/IUserRepository";
import { CreateUserUseCase } from "../CreateUserUseCase";
describe("Testing User Create", () => {
	const createUserUseCaseMock = new CreateUserUseCase(UserRepositoryMock()); 
	it("should be able create a user", async () => {
		const userMock : IUser = {
			id: randomUUID(),
			username: "John",
			email: "testMock@gmail.com",
			password: "supersecret",
			privileges: "admin",
			profilePicture: "https://...",
		};
		await expect(createUserUseCaseMock.execute(userMock)).resolves.not.toThrow();
	});

});