import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { UpdateUserUseCase } from "../UpdateUserUseCase";
import { UserMock } from "../../../../../mocks/users/UserMock";
import { IUserEdit } from "../../../repositories/IUserRepository";

describe("testing Update User Use Case" , () => {
	it("Should be throw a forbidden error because user that gonna be update is a root/admin", async () => {
		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock({
			privileges: "root"
		}));
		const fakeData = UserMock("admin");
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).rejects.toThrow();
	});
	it("Should be throw a forbidden error because user doesn't has permission to edit another users", async () => {
		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock());
		const fakeData : IUserEdit = {
			authenticateUserPrivileges: "user",
			authenticateUserId: "1234"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).rejects.toThrow();
	});
	it("Should be update a vip user", async () => {
		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock({
			id: "123",
			password: "123"
		}));
		const fakeData : IUserEdit = {
			username: "test",
			password: "123",
			authenticateUserPrivileges: "vip",
			authenticateUserId: "123"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).resolves.not.toThrow();
	});
	it("Should be update a user", async () => {
		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock({
			id: "123",
			password: "123"
		}));
		const fakeData : IUserEdit = {
			username: "test",
			password: "123",
			authenticateUserPrivileges: "user",
			authenticateUserId: "123"
		};
		await expect(updateUserUseCase.execute({id : "123", data: fakeData})).resolves.not.toThrow();
	});
});