declare namespace Express {
	export interface Request {
		user_id: string
		recoveryPassword: string
		privilege: string
	}
}