import { randomUUID } from "crypto";
import { IUser, IUserEdit, IUserFind, TPrivileges } from "../../../modules/users/repositories/IUserRepository";

export function UserMock(privileges : TPrivileges = "admin") {

	const user : IUser | IUserEdit | IUser[] | IUserEdit[] | IUserFind | IUserFind[] = {
		id: randomUUID(),
		email: "test@gmail.com",
		password: "1232rl12f",
		privileges,
		username: "test",
		profilePicture: "test"
	};
	return user;
}