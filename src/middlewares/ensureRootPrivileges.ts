import { NextFunction, Request, Response } from "express";

export function ensureRootPrivileges(request : Request, response : Response, next : NextFunction) {
	const {privilege} = request;
	if(privilege == "root") {
		return next();
	}
	return response.status(403).json("Unauthorized");

}