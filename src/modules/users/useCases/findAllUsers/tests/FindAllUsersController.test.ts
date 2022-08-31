import { getMockReq, getMockRes } from "@jest-mock/express";
import { FindAllUsersController } from "../FindAllUsersController";
import { FindAllUsersUseCase } from "../FindAllUsersUseCase";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { UserMock } from "../../../../../mocks/users/UserMock";

import { Validator } from "../../../../../handlers/Validator";
describe("Find All Users Controller", () => {
	it("Shouldn't be pass in the validator", async () => {
		const request = getMockReq({
			query: {
				limit:1,
				offset:1
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: true, message: "someError"};
		});
		const findAllUsersUseCase = new FindAllUsersUseCase(UserRepositoryMock());
		jest.spyOn(findAllUsersUseCase, "execute").mockImplementation(async () => {
			return [];
		});
		const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
		await findAllUsersController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
    
	});

	it("Should to be return status code 200", async () => {
		const request = getMockReq({
			query: {
				limit:"test",
				offset:"notANumber"
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const findAllUsersUseCase = new FindAllUsersUseCase(UserRepositoryMock());
		jest.spyOn(findAllUsersUseCase, "execute").mockImplementation(async () => {
			return [UserMock("admin")];
		});
		const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
		await findAllUsersController.handle(request,response);
		expect(response.status).toBeCalledWith(200);
	});

	it("Should be return a status code 400 with an error", async () => {
		const request = getMockReq({
			query: {
				limit:"test",
				offset:"notANumber"
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const findAllUsersUseCase = new FindAllUsersUseCase(UserRepositoryMock());
		jest.spyOn(findAllUsersUseCase, "execute").mockImplementation(async () => {
			throw new Error("database error");
		});
		const findAllUsersController = new FindAllUsersController(findAllUsersUseCase);
		await findAllUsersController.handle(request,response);
		expect(response.status).toBeCalledWith(500);
    
	});
});