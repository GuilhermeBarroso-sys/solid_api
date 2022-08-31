import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { DestroyManyUsersUseCase } from "../DestroyManyUsersUseCase";

describe("Testing Destroy Many Users Use Case" , () => {
	it("Should to be possible delete the ids", async () => {
		const destroyManyUsersUseCase = new DestroyManyUsersUseCase(UserRepositoryMock());
		const queryParamsIds = "1,2,3";
		await expect(destroyManyUsersUseCase.execute(queryParamsIds)).resolves.not.toThrow();
	});
	it("Should pass in the validation", async () => {
		const destroyManyUsersUseCase = new DestroyManyUsersUseCase(UserRepositoryMock(null, true));

		const queryParamsIds = "test1,test2,test3";
		await expect(destroyManyUsersUseCase.execute(queryParamsIds)).rejects.toThrow();
	});
});