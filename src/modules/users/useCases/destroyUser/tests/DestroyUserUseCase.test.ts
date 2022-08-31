import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { DestroyUserUseCase } from "../DestroyUserUseCase";

describe("Testing Destroy User Use Case", () => {
	it("Should be destroy a user", async () => {
		const destroyUserUseCase = new DestroyUserUseCase(UserRepositoryMock());
		await expect(destroyUserUseCase.execute("123")).resolves.not.toThrow();
	});

});