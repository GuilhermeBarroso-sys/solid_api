import Joi from "joi";

export const schema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	privileges: Joi.string().not("root").messages({
		"any.invalid": "You can't create a root user, please create an admin user, if you really need provider a new root user, contact the dev"
	})
});