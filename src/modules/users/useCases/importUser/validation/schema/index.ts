import Joi from "joi";
export const schema = Joi.object({
	file: Joi.required()
});