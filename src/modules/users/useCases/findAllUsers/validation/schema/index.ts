import Joi from "joi";
export const schema = Joi.object({
	privileges: Joi.string().equal("admin","root")
});