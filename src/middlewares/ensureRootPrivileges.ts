import { NextFunction, Request, Response } from "express";

export function ensureRootPrivileges(request : Request, response : Response, next : NextFunction) {
	const {privileges} = request;
	if(privileges == "root") {
		return next();
	}
	return response.status(403).json("Unauthorized");

}