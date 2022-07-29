import { Prisma, UserStatistic } from "@prisma/client";

type TPrivileges = "user" | "vip" | "admin" | "root"
export interface IUser  {
	id?: string;
	username: string;
	email: string;
	password: string;
	profilePicture?: string | null
	privileges: TPrivileges
}

export interface IUserFind {

	id: string,
	username: string,
	email: string,
	password: string,
	privileges: TPrivileges,
	profilePicture: string | null,
	UserStatistic?: UserStatistic[]
}

export interface IUserEdit {
	username?: string;
	email?: string;
	password?: string;
	profilePicture?: string | null
	privileges?: TPrivileges
}

export interface IFindAllParams {
	limit?: number
	offset?: number
	getStatistics?: false | true 
}
export interface IUserRepository {
	create(data : IUser) : Promise<void>
	createMany(data : IUser[]) : Promise<void>
	findUser(id : string) : Promise<IUserFind>
	findByEmail(email : string) : Promise<IUserFind>
	findAll({limit,offset} : IFindAllParams) : Promise<IUserFind[]>
	destroy(id : string) : Promise<void|number>
	destroyMany(ids: Array<string>) : Promise<void|number>
	update(id : string, data : IUserEdit) : Promise<void>
}