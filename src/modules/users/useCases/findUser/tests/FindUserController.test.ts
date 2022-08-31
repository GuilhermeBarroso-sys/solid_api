import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 } from "uuid";
import { Validator } from "../../../../../handlers/Validator";
import { UserMock } from "../../../../../mocks/users/UserMock";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { FindUserController } from "../FindUserController";
import { FindUserUseCase } from "../FindUserUseCase";

describe("Testing Find User Controller", () => {
	it("Shouldn't pass in the validator", async () => {
		const request = getMockReq({
			params: {
				id: v4().toString()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error:true, message: "someError"};
		});
		const findUserUseCaseMock = new FindUserUseCase(UserRepositoryMock()); 
		jest.spyOn(findUserUseCaseMock, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const findUserControllerMock = new FindUserController(findUserUseCaseMock);
		await findUserControllerMock.handle(request,response);
		expect(response.status).toBeCalledWith(400);
	});
	it("Should be return status code 200", async () => {
		const request = getMockReq({
			params: {
				id: v4().toString()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error:false, message: null};
		});
		const findUserUseCaseMock = new FindUserUseCase(UserRepositoryMock()); 
		jest.spyOn(findUserUseCaseMock, "execute").mockImplementation(async () => {
			return UserMock();
		});
		const findUserControllerMock = new FindUserController(findUserUseCaseMock);
		await findUserControllerMock.handle(request,response);
		expect(response.status).toBeCalledWith(200);
	});
	it("Should be throw an error and return status code 500", async () => {
		const request = getMockReq({
			params: {
				id: v4().toString()
			}
		});
		const {res : response} = getMockRes();
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error:false, message: null};
		});
		const findUserUseCaseMock = new FindUserUseCase(UserRepositoryMock()); 
		jest.spyOn(findUserUseCaseMock, "execute").mockImplementation(async () => {
			throw new Error("database error");
		});
		const findUserControllerMock = new FindUserController(findUserUseCaseMock);
		await findUserControllerMock.handle(request,response);
		expect(response.status).toBeCalledWith(500);
	});
});