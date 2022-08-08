import Joi from "joi";
export const schema = Joi.object({
	id: Joi.string().uuid().required()
});