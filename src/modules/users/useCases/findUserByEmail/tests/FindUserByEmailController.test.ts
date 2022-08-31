import {getMockReq,getMockRes} from "@jest-mock/express";
import { FindUserByEmailUseCase } from "../FindUserByEmailUseCase";
import {FindUserByEmailController} from "../FindUserByEmailController";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { Validator } from "../../../../../handlers/Validator";
import { UserMock } from "../../../../../mocks/users/UserMock";

describe("Testing Find User By Email Controller", () => {
	it("Shouldn't be pass in the validator", async () => {
		const request = getMockReq({
			params: {
				email: "test@gmail.com"
			}
		});
		const {res : response, } = getMockRes();
		const findUserByEmailUseCase = new FindUserByEmailUseCase(UserRepositoryMock());
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: true, message: "someError"};
		});
		jest.spyOn(findUserByEmailUseCase, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);
		await findUserByEmailController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
	});


	it("Should be return a user", async () => {
		const request = getMockReq({
			params: {
				email: "test@gmail.com"
			}
		});
		const {res : response, } = getMockRes();
		const findUserByEmailUseCase = new FindUserByEmailUseCase(UserRepositoryMock());
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		jest.spyOn(findUserByEmailUseCase, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);
		await findUserByEmailController.handle(request,response);
		expect(response.status).toBeCalledWith(200);
	});

	it("should be return an error with status code 500", async () => {
		const request = getMockReq({
			params: {
				email: "test@gmail.com"
			}
		});
		const {res : response, } = getMockRes();
		const findUserByEmailUseCase = new FindUserByEmailUseCase(UserRepositoryMock());
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		jest.spyOn(findUserByEmailUseCase, "execute").mockImplementation(async () => {
			throw new Error("");
		});
		const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);
		await findUserByEmailController.handle(request,response);
		expect(response.status).toBeCalledWith(500);
	});
});