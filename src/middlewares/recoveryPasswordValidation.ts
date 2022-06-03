import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
	sub: string;
}
export function recoveryPasswordValidation(request: Request, response: Response, next: NextFunction) {
	const {passwordToken} = request.body;
	try {
		if(!passwordToken) return response.status(400).json("Please, Provider an email token");
		const {sub} = verify(passwordToken, process.env.JWT_SECRET) as IPayload;
		request.recoveryPassword = sub;
		next();
	} catch(err) {
		return response.status(400).json(err.message);
	}
  
}