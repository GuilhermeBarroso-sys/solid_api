import { NextFunction, Request, Response } from "express";

export function ensureAdminPrivileges(request : Request, response : Response, next : NextFunction) {
	const {privileges} = request;
	if(privileges == "root" || privileges == "admin") {
		return next();
	}
	return response.status(403).json("Unauthorized");

}