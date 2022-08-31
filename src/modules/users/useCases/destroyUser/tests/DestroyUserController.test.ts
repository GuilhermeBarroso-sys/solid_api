import { getMockReq, getMockRes } from "@jest-mock/express";
import { Validator } from "../../../../../handlers/Validator";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { DestroyUserController } from "../DestroyUserController";
import { DestroyUserUseCase } from "../DestroyUserUseCase";

describe("testing destroy user controller", ()=> {
	it("Shouldn't be pass in validation", async () => {
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: true, message: "someError"};
		});
		const destroyUserUseCase = new DestroyUserUseCase(UserRepositoryMock());
		jest.spyOn(destroyUserUseCase, "execute").mockImplementation(async () => {
			return null;
		});
		const updateUserController = new DestroyUserController(destroyUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
	});
	it("Should be return status code 204" , async () => {
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const destroyUserUseCase = new DestroyUserUseCase(UserRepositoryMock());
		jest.spyOn(destroyUserUseCase, "execute").mockImplementation(async () => {
			return null;
		});
		const updateUserController = new DestroyUserController(destroyUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(204);

	});
	it("Should be throw an error with status code 500" , async () => {
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {error: false, message: null};
		});
		const destroyUserUseCase = new DestroyUserUseCase(UserRepositoryMock());
		jest.spyOn(destroyUserUseCase, "execute").mockImplementation( async () => {
			throw new Error("database error!");
		});
		const updateUserController = new DestroyUserController(destroyUserUseCase);
		await updateUserController.handle(request,response);
		expect(response.status).toBeCalledWith(500);

	});
});