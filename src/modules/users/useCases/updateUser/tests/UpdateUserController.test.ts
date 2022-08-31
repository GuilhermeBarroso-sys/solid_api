import { getMockReq, getMockRes } from "@jest-mock/express";
import { Validator } from "../../../../../handlers/Validator";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { UpdateUserController } from "../UpdateUserController";
import { UpdateUserUseCase } from "../UpdateUserUseCase";

describe("testing Update User Controller", () => {
	it("Shouldn't pass in the validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some Error"      
			};
		});
		const request = getMockReq({
			params: {
				id: "123"
			},
			body: {
				username: "test",
				email:    "test@gmail.com",
				password: "test"
			}
		});
		const {res : response} = getMockRes();

		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock());
		jest.spyOn(updateUserUseCase, "execute").mockImplementation(async () => {});
		const updateUserController = new UpdateUserController(updateUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
	});
	it("Should be return status code 204" , async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null    
			};
		});
		const request = getMockReq({
			params: {
				id: "123"
			},
			body: {
				username: "test",
				email:    "test@gmail.com",
				password: "test"
			}
		});
		const {res : response} = getMockRes();

		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock());
		jest.spyOn(updateUserUseCase, "execute").mockImplementation(async () => {});
		const updateUserController = new UpdateUserController(updateUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(204);

	});
	it("Should be throw error an error with status code 500" , async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null    
			};
		});
		const request = getMockReq({
			params: {
				id: "123"
			},
			body: {
				username: null,
				email:    null,
				password: null
			}
		});
		const {res : response} = getMockRes();

		const updateUserUseCase = new UpdateUserUseCase(UserRepositoryMock());
		jest.spyOn(updateUserUseCase, "execute").mockImplementation(async () => {throw new Error("Database error");});
		const updateUserController = new UpdateUserController(updateUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(500);

	});
});