
import { prisma } from "../../../../prisma";
import {IUser, IUserEdit, IUserFind, IUserRepository} from "../IUserRepository";

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
	async findAll(): Promise<IUserFind[]> {
		return await prisma.user.findMany();
	}
	destroy(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	update(id: string, data: IUserEdit): Promise<void> {
		throw new Error("Method not implemented.");
	}

}

export {UserRepositoryPrisma};