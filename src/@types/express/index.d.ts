
declare namespace Express {
	import { TPrivileges } from "../../modules/users/repositories/IUserRepository";
	export interface Request {
		user_id: string
		recoveryPassword: string
		privileges: TPrivileges
	}
}