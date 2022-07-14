import { DestroyManyUsersUseCase } from "../DestroyManyUsersUseCase";

describe("Testing Destroy Many Users Use Case" , () => {
	const destroyManyUsersUseCase = new DestroyManyUsersUseCase({
		create: async () => {},
		findAll: async () => {return {...[]}; },
		createMany: async () => {throw new Error("error");},
		findByEmail: async () => {return null;}, //this throw a error
		destroy: async () => {},
		destroyMany: async () => {},
		update: async () => {},
		findUser: async () => {return {id: "",username: "", email: "", password: ""};}
	});
	it("Shouldn't pass in the validation", async () => {
		const queryParamsIds = null;
		await expect(destroyManyUsersUseCase.execute(queryParamsIds)).rejects.toThrowError("Invalid param!");
	});
	it("Should pass in the validation", async () => {
		const queryParamsIds = "test1,test2,test3";
		await expect(destroyManyUsersUseCase.execute(queryParamsIds)).resolves.not.toThrow();
	});
});