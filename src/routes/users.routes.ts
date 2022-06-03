import { Router } from "express";
import multer from "multer";
import {parse} from "csv-parse";
import { createUserFactory } from "../modules/users/useCases/createUser";
import { FindUserFactory } from "../modules/users/useCases/findUser";
import fs from "fs";
import { ImportUserFactory } from "../modules/users/useCases/importUser";
import { AuthenticateUserFactory } from "../modules/users/useCases/authenticateUser";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { FindUserByEmailFactory } from "../modules/users/useCases/findUserByEmail";
import { SendEmailToRecoveryPasswordFactory } from "../modules/users/useCases/sendEmailRecoveryPassword";
import { RecoveryPasswordFactory } from "../modules/users/useCases/recoveryPassword";
import { recoveryPasswordValidation } from "../middlewares/recoveryPasswordValidation";
const usersRoutes = Router();
const upload = multer({
	dest: "./tmp"
});

usersRoutes.get("/:email", ensureAuthenticate, (request, response) => {
	return FindUserByEmailFactory().handle(request,response);
});

usersRoutes.get("/:id", ensureAuthenticate , (request, response) => {
	return FindUserFactory().handle(request, response);
});

usersRoutes.post("/authenticate", (request,response) => {
	return AuthenticateUserFactory().handle(request, response);
});

usersRoutes.post("/", (request,response) => {
	return createUserFactory().handle(request, response);
});

usersRoutes.post("/import", upload.single("file"), async (request,response) => {
	return ImportUserFactory().handle(request, response);
});

usersRoutes.post("/sendEmailToRecoveryPassword", async (request, response) => {
	return SendEmailToRecoveryPasswordFactory().handle(request, response);
});

usersRoutes.patch("/recoveryPassword", recoveryPasswordValidation ,async (request, response) => {
	return RecoveryPasswordFactory().handle(request, response);
});

export {usersRoutes};