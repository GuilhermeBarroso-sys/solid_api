import Joi from "joi";
export const schema = Joi.object({
	ids: Joi.string().min(36)
});