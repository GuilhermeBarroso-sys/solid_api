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
const usersRoutes = Router();
const upload = multer({
	dest: "./tmp"
});

usersRoutes.post("/authenticate", (request,response) => {
	return AuthenticateUserFactory().handle(request, response);
});


usersRoutes.post("/", (request,response) => {
	return createUserFactory().handle(request, response);
});
usersRoutes.get("/:email", ensureAuthenticate, (request, response) => {
	return FindUserByEmailFactory().handle(request,response);
});

usersRoutes.get("/:id", ensureAuthenticate , (request, response) => {
	return FindUserFactory().handle(request, response);
});

usersRoutes.post("/import", upload.single("file"), async (request,response) => {
	return ImportUserFactory().handle(request, response);
});
export {usersRoutes};