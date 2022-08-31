import { hash, hashSync } from "bcryptjs";
import { randomUUID } from "crypto";
import { IUser, IUserFind, IUserRepository } from "../../../modules/users/repositories/IUserRepository";

export function UserRepositoryMock(customUser : IUserFind = {
	id: randomUUID(),
	email: "test@gmail.com",
	password: hashSync("123", 1),
	privileges: "user",
	username: "testUser"
}, throwError = false, defaultError = new Error("")) {
	const UserRepository : IUserRepository = throwError 
		? {
			create:async () => {throw defaultError;},
			createMany:async () => {throw defaultError;},
			custom:async () => {throw defaultError;},
			destroy:async () => {throw defaultError;},
			destroyMany:async () => {return 0;},
			findAll:async () => {throw defaultError;},
			findByEmail:async () => {throw defaultError;},
			findUser:async () => {throw defaultError;},
			update:async () => {throw defaultError;}
		}
		: {
			create: async () => {},
			findAll: async () => {return [customUser]; },
			createMany: async () => {},
			findByEmail: async () => {return customUser;},
			destroy: async () => {return 1;},
			destroyMany: async () => {return 5;},
			update: async () => {},
			findUser: async () => {return customUser;},
			custom: async () => {return [customUser];}     
		}; 
	return UserRepository;
}