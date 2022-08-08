import { Prisma, PrismaClient, UserStatistic } from "@prisma/client";
import { Sql } from "@prisma/client/runtime";
import { SQLStatement } from "sql-template-strings";
import { UserRepositoryPrisma } from "./prisma/UserRepositoryPrisma";

export type TPrivileges = "user" | "vip" | "admin" | "root"
export interface IUser  {
	id?: string;
	username: string;
	email: string;
	password: string;
	profilePicture?: string | null
	privileges: TPrivileges
}

export interface IUserFind {

	id?: string,
	username?: string,
	email?: string,
	password?: string,
	privileges?: TPrivileges,
	profilePicture?: string | null,
	UserStatistic?: UserStatistic[]
}

export interface IUserEdit {
	username?: string;
	email?: string;
	password?: string;
	profilePicture?: string | null
	privileges?: TPrivileges
	authenticateUserPrivileges: TPrivileges
	authenticateUserId: string
}

export interface IFindAllParams {
	limit?: number
	offset?: number
	select?: Prisma.UserSelect
	where?: Prisma.UserWhereInput
	getStatistics?: false | true 
}

export interface IUserRepository{
	custom(query : string|any) : Promise<IUserFind[]>
	create(data : IUser) : Promise<void>
	createMany(data : IUser[]) : Promise<void>
	findUser(id : string) : Promise<IUserFind>
	findByEmail(email : string) : Promise<IUserFind>
	findAll({limit,offset} : IFindAllParams) : Promise<IUserFind[]>
	destroy(id : string) : Promise<void|number>
	destroyMany(ids: Array<string>) : Promise<void|number>
	update(id : string, data : IUserEdit) : Promise<void>
}