import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { FindUserByEmailUseCase } from "../FindUserByEmailUseCase";

describe("Testing Find User By Email Use Case", () => {
	it("Should be return a user", async () => {
		const findUserByEmailUseCase = new FindUserByEmailUseCase(UserRepositoryMock());
		await expect(findUserByEmailUseCase.execute("test@gmail.com")).resolves.not.toThrow();
	});
});