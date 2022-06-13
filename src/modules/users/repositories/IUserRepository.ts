export interface IUser  {
	id?: string;
	username: string;
	email: string;
	password: string;
}

export interface IUserFind {
	id: string;
	username: string;
	email: string;
	password: string;
}

export interface IUserEdit {
	username?: string;
	email?: string;
	password?: string;
}
export interface IUserRepository {
	create(data : IUser) : Promise<void>
	createMany(data : IUser[]) : Promise<void>
	findUser(id : string) : Promise<IUserFind>
	findByEmail(email : string) : Promise<IUserFind>
	findAll() : Promise<IUserFind[]>
	destroy(id : string) : Promise<void>
	update(id : string, data : IUserEdit) : Promise<void>
}