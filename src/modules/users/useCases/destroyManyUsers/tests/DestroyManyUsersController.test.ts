import { getMockReq, getMockRes } from "@jest-mock/express";
import { DestroyManyUsersController } from "../DestroyManyUsersController";
import { DestroyManyUsersUseCase } from "../DestroyManyUsersUseCase";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";
import { Validator } from "../../../../../handlers/Validator";
describe("Testing Destroy Many Users Controller" , () => {
	const destroyManyUsersUseCase = new DestroyManyUsersUseCase(UserRepositoryMock());
	const request = getMockReq({
		query: {
			ids: "test1,test2,test3"
		}
	});
	const {res : response} = getMockRes();
	it("Shouldn't pass in the validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: true, message: "someError"};
		});
		jest.spyOn(destroyManyUsersUseCase, "execute").mockImplementation(async () => {});
		const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
		await destroyManyUsersController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(400);
	});
	it("Should be return a status code 204",  async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		jest.spyOn(destroyManyUsersUseCase, "execute").mockImplementation(async () => {});
		const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
		await destroyManyUsersController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(204);
	});

	it("Should be throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		jest.spyOn(destroyManyUsersUseCase, "execute").mockImplementation(async () => {throw new Error("Database error");});
		const destroyManyUsersController = new DestroyManyUsersController(destroyManyUsersUseCase);
		await destroyManyUsersController.handle(request,response);
		expect(response.status).toHaveBeenCalledWith(500);
	});
});