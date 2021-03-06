import { Router } from "express";
import multer from "multer";
import {parse} from "csv-parse";
import { createUserFactory } from "../modules/users/useCases/createUser";
import { FindUserFactory } from "../modules/users/useCases/findUser";
import { ImportUserFactory } from "../modules/users/useCases/importUser";
import { AuthenticateUserFactory } from "../modules/users/useCases/authenticateUser";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { FindUserByEmailFactory } from "../modules/users/useCases/findUserByEmail";
import { SendEmailToRecoveryPasswordFactory } from "../modules/users/useCases/sendEmailRecoveryPassword";
import { RecoveryPasswordFactory } from "../modules/users/useCases/recoveryPassword";
import { recoveryPasswordValidation } from "../middlewares/recoveryPasswordValidation";
import { UpdateUserFactory } from "../modules/users/useCases/updateUser";
import { DestroyUserFactory } from "../modules/users/useCases/destroyUser";
import { GetAuthenticateUserFactory } from "../modules/users/useCases/getAuthenticateUser";
import { FindAllUsersFactory } from "../modules/users/useCases/findAllUsers";
import { DestroyManyUsersFactory } from "../modules/users/useCases/destroyManyUsers";
import { ensureAdminPrivileges } from "../middlewares/ensureAdminPrivileges";
const usersRoutes = Router();
const upload = multer({
	dest: "./tmp"
});

usersRoutes.get("/email/:email", ensureAuthenticate, (request, response) => {
	return FindUserByEmailFactory().handle(request,response);
});
usersRoutes.get("/", ensureAuthenticate, (request, response) => {
	return FindAllUsersFactory().handle(request, response);
});
usersRoutes.get("/authenticate", ensureAuthenticate , (request, response) => {
	return GetAuthenticateUserFactory().handle(request, response);
});
usersRoutes.get("/:id", ensureAuthenticate , (request, response) => {
	return FindUserFactory().handle(request, response);
});
usersRoutes.post("/authenticate", (request,response) => {

	return AuthenticateUserFactory().handle(request, response);
});

usersRoutes.post("/", ensureAuthenticate, ensureAdminPrivileges ,(request,response) => {
	return createUserFactory().handle(request, response);
});

usersRoutes.post("/import", ensureAuthenticate , upload.single("file"), async (request,response) => {
	return ImportUserFactory().handle(request, response);
});

usersRoutes.post("/sendEmailToRecoveryPassword", ensureAuthenticate ,async (request, response) => {
	return SendEmailToRecoveryPasswordFactory().handle(request, response);
});

usersRoutes.patch("/recoveryPassword", ensureAuthenticate , recoveryPasswordValidation ,async (request, response) => {
	return RecoveryPasswordFactory().handle(request, response);
});

usersRoutes.put("/:id", ensureAuthenticate ,async (request, response) => {
	return UpdateUserFactory().handle(request,response);
});

usersRoutes.delete("/", ensureAuthenticate ,async (request, response) => {
	return DestroyManyUsersFactory().handle(request,response);
});
usersRoutes.delete("/:id", ensureAuthenticate ,async (request, response) => {
	return DestroyUserFactory().handle(request,response);
});


export {usersRoutes};