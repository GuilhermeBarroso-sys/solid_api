import { FindUserByEmailUseCase } from "../FindUserByEmailUseCase";

describe("Testing Find User By Email Use Case", () => {
	it("Should be return a user", async () => {
		const findUserByEmailUseCase = new FindUserByEmailUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		});

		await expect(findUserByEmailUseCase.execute("test@gmail.com")).resolves.not.toThrow();
		await expect(findUserByEmailUseCase.execute("test@gmail.com")).resolves.toStrictEqual({id: "",username: "", email: "123@gmail.com"});
	});
});