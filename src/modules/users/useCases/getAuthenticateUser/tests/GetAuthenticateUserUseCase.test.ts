import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { GetAuthenticateUserUseCase } from "../GetAuthenticateUserUseCase";

describe("Testing Get Authenticate User Use Case", () => {
	it("Should be return a user", async () => {
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase(UserRepositoryMock());
		await expect(getAuthenticateUserUseCase.execute("123")).resolves.not.toThrow();
	});
});