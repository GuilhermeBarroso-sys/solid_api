import { ImportUserUseCase } from "../ImportUserUseCase";
import fs from "fs";
import { IUser } from "../../../repositories/IUserRepository";
import { v4 } from "uuid";
import path from "path";
import { parse } from "csv-parse/.";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import {UserMock} from "../../../../../mocks/users/UserMock";
import { randomUUID } from "crypto";
jest.mock("fs");
// jest.requireActual('')
const mockedFs = fs as jest.Mocked<typeof fs>;

beforeAll(() => {
  
	jest.spyOn(ImportUserUseCase.prototype, "loadFile").mockImplementation(async (mockedPath: string) => {
		const csvParse = parse();
		fs.createReadStream(path.resolve(__dirname, mockedPath))
			.pipe(csvParse)
			.on("data", async () => {})
			.on("end", () => {});
		const usersMock : IUser[] = [{
			id: randomUUID(),
			username: "test",
			email: "test@gmail.com",
			password: "1341241242",
			privileges: "admin",
			profilePicture: "https://..."
		}];
		return usersMock;
	});
});
describe("Testing Import User Use Case", () => {
	const importUserUseCase = new ImportUserUseCase(UserRepositoryMock()); 
	it("Should throw a file type Error", async () => {
		const fileMockFileType : Express.Multer.File = {
			fieldname: "file",
			originalname: "mockUserImport.csv",
			encoding: "7bit",
			mimetype: "Application/pdf",
			destination: "./tmp/mock",
			filename: "mockUserImport.csv",
			path: "tmp/mockUserImport.csv",
			buffer: null,
			stream: null,
			size: 1024
		};
		await expect(importUserUseCase.execute(fileMockFileType)).rejects.toThrowError("Unsupported file type: 'Application/pdf'. Please, provider a csv file.");
		await expect(importUserUseCase.execute(undefined)).rejects.toThrowError("Error! Missing file in the request");
	

	});
	it("Should be read file", async () => {
		const fileMockFileType : Express.Multer.File = {
			fieldname: "file",
			originalname: "mockUserImport.csv",
			encoding: "7bit",
			mimetype: "text/csv",
			destination: "./tmp/mock",
			filename: "mockUserImport.csv",
			path: path.resolve("tmp/mock/mockUserImport.csv"),
			buffer: null,
			stream: null,
			size: 1024
		};
    
		const mReadStream = {
			pipe: jest.fn().mockReturnThis(),
			on: jest.fn().mockImplementation(function (event, handler) {
				handler();
				return this;
			}),
		};
		//@ts-ignore
		mockedFs.createReadStream.mockReturnValueOnce(mReadStream);
		await importUserUseCase.execute(fileMockFileType);
		expect(importUserUseCase.loadFile).toHaveBeenCalledTimes(1);
		expect(fs.createReadStream).toBeCalledTimes(1);
		expect(mReadStream.pipe).toBeCalledTimes(1);
		expect(mReadStream.on).toBeCalledWith("data", expect.any(Function));
		expect(mReadStream.on).toBeCalledWith("end", expect.any(Function));

	
		
	});
});