import { parse } from "csv-parse";
import { IUserRepository } from "../../repositories/IUserRepository";
import fs from "fs";
import {hashSync} from "bcryptjs";
import { unlink } from "fs/promises";
interface IUser {
  
	username: string;
	email: string
	password: string;
}


class ImportUserUseCase {

	constructor(private userRepository : IUserRepository) {}
	/* c8 ignore start */
	loadFile (path: string) : Promise<IUser[]>{
		return new Promise((resolve, reject) => {
			const users: Array<IUser> = [];
  
			const stream = fs.createReadStream(path);
			// pipe conecta uma readable stream com uma writeable stream
			const parseFile = parse();
			stream.pipe(parseFile);
			parseFile
				.on("data", async (data) => {	

					const [username,email, password] = data;
          
					users.push({username,email, password});
				})
				.on("end", async () => {
					await unlink(path);
					resolve(users);
				})
				.on("error", async (err) => {
					await unlink(path);
					reject({
						errorName: err.name,
						errorReason: err.message
					});
				});
		});
	}
	/* c8 ignore end */
	hashPasswords(result : IUser[]) {
		return result.map((users) => {
			users.password = hashSync(users.password, 2);
		
			return users;
		});
	}
	async execute(file: Express.Multer.File) : Promise<void> {
		if(!file) throw new Error("Error! Missing file in the request");
		if(file.mimetype !== "text/csv") throw new Error(`Unsupported file type: '${file.mimetype}'. Please, provider a csv file.`);
		const result = await this.loadFile(file.path);
		const users = this.hashPasswords(result);
		await this.userRepository.createMany(users); 
	}
}

export { ImportUserUseCase };