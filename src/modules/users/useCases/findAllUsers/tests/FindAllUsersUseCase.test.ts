import { FindAllUsersUseCase } from "../FindAllUsersUseCase";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";

describe("Find All Users Use Case", () => {
	it("Should be find all users", async () => {
		const findAllUsersUseCase = new FindAllUsersUseCase(UserRepositoryMock());
		await expect(findAllUsersUseCase.execute({privileges: "root"})).resolves.not.toThrow();
	});

	it("Should be find all of the users that doesn't have root or admin privileges", async () => {
		const findAllUsersUseCase = new FindAllUsersUseCase(UserRepositoryMock());
		await expect(findAllUsersUseCase.execute({privileges: "admin"})).resolves.not.toThrow();
	});
	
});