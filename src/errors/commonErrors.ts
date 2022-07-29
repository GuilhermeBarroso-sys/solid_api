export const commonErrors =  [
	{
		errorName: "P2002",
		status: 409,
		message: "This user Already exists!"
	},
	{
		errorName: "userNotExists",
		status: 400,
		message: "This user doesn't exists!"
	},
	{
		errorName: "wrongCredentials",
		status: 401,
		message: "Wrong Credentials! verify it and try again"
	}, {
		errorName: "unprocessableEntity",
		status: 422,
		message: undefined
	}
];