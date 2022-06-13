import {getMockReq,getMockRes} from "@jest-mock/express";
import { FindUserByEmailUseCase } from "../FindUserByEmailUseCase";
import {FindUserByEmailController} from "../FindUserByEmailController";

describe("Testing Find User By Email Controller", () => {
	it("Should be return a status code 200", async () => {
		const request = getMockReq({
			params: {
				email: "test@gmail.com"
			}
		});
		const {res : response, } = getMockRes();
		const findUserByEmailUseCase = new FindUserByEmailUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		});
		findUserByEmailUseCase.execute = async () => {
			return {id: "",username: "", email: "123@gmail.com", password: ""};
		};

		const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);

		await findUserByEmailController.handle(request,response);
		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith({id: "",username: "", email: "123@gmail.com", password: ""});
	});

	it("Should be return a status code 400", async () => {
		const request = getMockReq({
			params: {
				email: "test@gmail.com"
			}
		});
		const {res : response, } = getMockRes();
		const findUserByEmailUseCase = new FindUserByEmailUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		});
		findUserByEmailUseCase.execute = async () => {
			throw new Error("");
		};

		const findUserByEmailController = new FindUserByEmailController(findUserByEmailUseCase);

		await findUserByEmailController.handle(request,response);
		expect(response.status).toBeCalledWith(400);
	});
});