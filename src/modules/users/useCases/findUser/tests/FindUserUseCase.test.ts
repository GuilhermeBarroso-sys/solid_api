import { v4 } from "uuid";
import { FindUserUseCase } from "../FindUserUseCase";


describe("Testing Find User", ()=> {
	it("Should be return a user", async () => {
		const findUserUseCaseMock = new FindUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const mockedUuid = v4().toString();
		await expect(findUserUseCaseMock.execute(mockedUuid)).resolves.not.toThrow();    
	});
});