import { Request, Response } from "express";
import { handlerError } from "../../../../errors";
import { isValid } from "../../../../handlers/isValid";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { schema } from "./validation/schema";

class UpdateUserController {
	constructor (private updateUserUseCase : UpdateUserUseCase) {}
	async handle(request : Request, response : Response) {
		try {
			const {id} = request.params;
			const {privileges : authenticateUserPrivileges, user_id : authenticateUserId} = request;
			const {username, email, password, privileges , profilePicture} = request.body;
			const {error, message} = isValid({id, username ,email ,password, privileges, profilePicture}, schema);
			if(error) {
				return response.status(400).json(message);
			}
			const data = {
				username,
				email,
				password,
				privileges,
				authenticateUserPrivileges,
				authenticateUserId
			};
			await this.updateUserUseCase.execute({id, data});
			return response.status(204).send();
		} catch (err) {
			const {message,status} = handlerError(err);
			return response.status(status).json(message);
		}
	}

}

export {UpdateUserController  };