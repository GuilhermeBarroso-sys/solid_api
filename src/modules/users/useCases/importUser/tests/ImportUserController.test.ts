import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 } from "uuid";
import { ImportUserController } from "../ImportUserController";
import { ImportUserUseCase } from "../ImportUserUseCase";
import {UserRepositoryMock} from "../../../../../mocks/users/userRepositoryMock";
import { Validator } from "../../../../../handlers/Validator";
describe("Testing Import User Controller", () => {
	beforeAll(() => {
		jest.spyOn(ImportUserUseCase.prototype, "execute").mockImplementation(async (file : Express.Multer.File) => {
			if(!file) throw new Error("Error! Missing file in the request");
			if(file.mimetype !== "text/csv") throw new Error(`Unsupported file type: '${file.mimetype}'. Please, provider a csv file.`);
		});
	});
	it("Shouldn't be pass in the validator", async () => {
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Some error"
			};
		});
		const {res : response} = getMockRes();
		const importUserUseCaseMock = new ImportUserUseCase(UserRepositoryMock()); 
		const importUserControllerMock = new ImportUserController(importUserUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("file");
		expect(response.status).toBeCalledWith(400);
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const {res : response} = getMockRes();
		const importUserUseCaseMock = new ImportUserUseCase(UserRepositoryMock()); 
		jest.spyOn(importUserUseCaseMock, "execute").mockImplementation(async () => {});
		const importUserControllerMock = new ImportUserController(importUserUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("file");
		expect(response.status).toBeCalledWith(201);
	});
	it("Should be throw an error with status code 500", async () => {
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
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});
		const {res : response} = getMockRes();
		const importUserUseCaseMock = new ImportUserUseCase(UserRepositoryMock()); 
		jest.spyOn(importUserUseCaseMock, "execute").mockImplementation(async () => {
			throw new Error("");
		});
		const importUserControllerMock = new ImportUserController(importUserUseCaseMock);
		await importUserControllerMock.handle(request,response);
		expect(request).toHaveProperty("file");
		expect(response.status).toBeCalledWith(400);
	});


});