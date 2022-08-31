import { getMockReq, getMockRes } from "@jest-mock/express";
import { Validator } from "../../../../../handlers/Validator";
import { UserMock } from "../../../../../mocks/users/UserMock";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { GetAuthenticateUserController } from "../GetAuthenticateUserController";
import { GetAuthenticateUserUseCase } from "../GetAuthenticateUserUseCase";

describe("Testing Get Authenticate User Controller", () => {
	it("Shouldn't pass in the validator and return status code 401", async () => {
		const request = getMockReq({
			user_id: "123"
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: true, message: "someError"};
		});
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase(UserRepositoryMock());
		jest.spyOn(getAuthenticateUserUseCase, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
		await getAuthenticateUserController.handle(request, response);
		expect(response.status).toBeCalledWith(401);
	});
	it("Should be return a user with status code 200", async () => {
		const request = getMockReq({
			user_id: "123"
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase(UserRepositoryMock());
		jest.spyOn(getAuthenticateUserUseCase, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
		await getAuthenticateUserController.handle(request, response);
		expect(response.status).toBeCalledWith(200);
	});

	it("Should be throw an error with status code 500", async () => {
		const request = getMockReq({
			user_id: "123"
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const getAuthenticateUserUseCase = new GetAuthenticateUserUseCase(UserRepositoryMock());
		jest.spyOn(getAuthenticateUserUseCase, "execute").mockImplementation(async () => {
			throw new Error("");
		});
		const getAuthenticateUserController = new GetAuthenticateUserController(getAuthenticateUserUseCase);
		await getAuthenticateUserController.handle(request, response);
		expect(response.status).toBeCalledWith(500);
	});
});