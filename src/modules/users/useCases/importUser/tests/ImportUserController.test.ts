import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 } from "uuid";
import { ImportUserController } from "../ImportUserController";
import { ImportUserUseCase } from "../ImportUserUseCase";

describe("Testing Import User Controller", () => {
	beforeAll(() => {
		jest.spyOn(ImportUserUseCase.prototype, "execute").mockImplementation(async (file : Express.Multer.File) => {
			if(!file) throw new Error("Error! Missing file in the request");
			if(file.mimetype !== "text/csv") throw new Error(`Unsupported file type: '${file.mimetype}'. Please, provider a csv file.`);
		});
	});
	it("Should be return status code 201", async () => {
		const fileMockFileType : Express.Multer.File = {
			fieldname: "file",
			originalname: "mockUserImport.csv",
			encoding: "7bit",
			mimetype: "text/csv",
			destination: "./tmp/mock",
			filename: "mockUserImport.csv",
			path: "tmp/mockUserImport.csv",
			buffer: null,
			stream: null,
			size: 1024
		};
		const request = getMockReq({
			file: fileMockFileType
		});
		const {res : response} = getMockRes();
		const importUserUseCaseMock = new ImportUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const importUserControllerMock = new ImportUserController(importUserUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("file");
		expect(response.status).toBeCalledWith(201);
	});

	it("Should be return a error with status code 400", async () => {
		const fileMockFileType : Express.Multer.File = {
			fieldname: "file",
			originalname: "mockUserImport.pdf",
			encoding: "7bit",
			mimetype: "Application/pdf",
			destination: "./tmp/mock",
			filename: "mockUserImport.pdf",
			path: "tmp/mockUserImport.pdf",
			buffer: null,
			stream: null,
			size: 1024
		};
		const request = getMockReq({
			file: fileMockFileType
		});
		const {res : response} = getMockRes();
		const importUserUseCaseMock = new ImportUserUseCase({
			create: async () => {},
			findAll: async () => {return {...[]}; },
			createMany: async () => {throw new Error("error");},
			destroy: async () => {},
			update: async () => {},
			findByEmail: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};},
			findUser: async () => {return {id: "",username: "", email: "123@gmail.com", password: ""};}
		}); 
		const importUserControllerMock = new ImportUserController(importUserUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("file");
		expect(response.status).toBeCalledWith(400);
		expect(response.json).toBeCalledWith("Unsupported file type: 'Application/pdf'. Please, provider a csv file.");

	});


});