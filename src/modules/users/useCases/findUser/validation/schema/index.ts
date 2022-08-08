import Joi from "joi";
export const schema = Joi.object({
	id: Joi.string().uuid().required().messages({
		"string.guid": "Please, provider a valid uuid"
	})
});