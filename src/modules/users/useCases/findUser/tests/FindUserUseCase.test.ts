import { v4 } from "uuid";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { FindUserUseCase } from "../FindUserUseCase";


describe("Testing Find User", ()=> {
	it("Should be return a user", async () => {
		const findUserUseCaseMock = new FindUserUseCase(UserRepositoryMock());
		const mockedUuid = v4().toString();
		await expect(findUserUseCaseMock.execute(mockedUuid)).resolves.not.toThrow();    
	});
});