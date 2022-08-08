import { SQLStatement } from "sql-template-strings";
import { prisma } from "../../../../prisma";
import {IFindAllParams, IUser, IUserEdit, IUserFind, IUserRepository} from "../IUserRepository";

class UserRepositoryPrisma implements IUserRepository {

	async custom(query:  SQLStatement|any): Promise<IUserFind[]> {
		return await prisma.$queryRaw<IUserFind[]>(query);
	}

	async findByEmail(email: string): Promise<IUserFind> {
		return await prisma.user.findFirst({
			where:{
				email
			}
		});
	}
	async create({username, email, password,profilePicture, privileges}: IUser): Promise<void> {
		await prisma.user.create({
			data: {
				username,
				email,
				password,
				privileges,
				profilePicture
			}
		});
	}
	async createMany(data: IUser[]): Promise<void> {
		await prisma.user.createMany({
			data
		});
	}
	async findUser(id : string): Promise<IUserFind> {
		return await prisma.user.findFirst({
			where: {
				id
			}
		});
	}
	async findAll({limit,offset,select, where} : IFindAllParams): Promise<IUserFind[]> {
		return await prisma.user.findMany({
			take: limit,
			skip: offset,
			select: select ? select : undefined,
			where: where ? where : undefined
		});
		
	}
	async destroy(id : string): Promise<void|number> {
		await prisma.user.delete({
			where: {
				id
			}
		});
	}
	async destroyMany(ids : Array<string>): Promise<void|number> {
		const {count} = await prisma.user.deleteMany({
			where: {
				id: {
					in: ids
				}
			}
		});
		return count;
	}
	async update(id: string, data: IUserEdit): Promise<void> {
		await prisma.user.update({
			data,
			where: {
				id
			}
		});
	}

}

export {UserRepositoryPrisma};