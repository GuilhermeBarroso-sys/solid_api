import { NextFunction, Request, Response } from "express";

export function ensureAdminPrivileges(request : Request, response : Response, next : NextFunction) {
	const {privilege} = request;
	if(privilege == "root" || privilege == "admin") {
		return next();
	}
	return response.status(403).json("Unauthorized");

}