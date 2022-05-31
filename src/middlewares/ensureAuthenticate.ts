import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
interface IJWTPayload  {
	iat: number
	sub: string
}
export async function ensureAuthenticate(request : Request, response : Response, next : NextFunction) {
	const authToken = request.headers.authorization;
	if(!authToken) return response.status(401).json("Token Not Found");
	const [,token] = authToken.split(" ");
	try {
		const { sub : id } = verify(token, process.env.JWT_SECRET) as IJWTPayload;
		request.user_id = id;
		return next();
	} catch (err) { 
		return response.status(401).json(err.message);
	}
}