
import { prisma } from "../../../../prisma";
import {IFindAllParams, IUser, IUserEdit, IUserFind, IUserRepository} from "../IUserRepository";

class UserRepositoryPrisma implements IUserRepository {
	async findByEmail(email: string): Promise<IUserFind> {
		return await prisma.user.findFirst({
			where:{
				email
			}
		});
	}
	async create({username, email, password}: IUser): Promise<void> {
		await prisma.user.create({
			data: {
				username,
				email,
				password
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
	async findAll({limit,offset} : IFindAllParams): Promise<IUserFind[]> {
		return await prisma.user.findMany({
			take: limit,
			skip: offset
		});
	}
	async destroy(id : string): Promise<void> {
		await prisma.user.delete({
			where: {
				id
			}
		});
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