import Joi from "joi";
import { isValidPassword } from "../../../../../../handlers/passwordValidation";
import { PasswordPolicies } from "../../../../../../handlers/passwordValidation/PasswordPolicies";
export const schema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required().custom((value, helper) => {
		const passwordPolicies = new PasswordPolicies({});
		if(!isValidPassword(value, passwordPolicies)) {
			const messageLength = "Password length should to be 6 or more";
			const messageRequireUpperCase = passwordPolicies.requireUpperCase ? "Contains one letter in Uppercase": "";
			const messageSpecialCharacter = passwordPolicies.requireSpecialCharacter ? "Contains Special Characters": "";
			return helper.message({
				custom: `Invalid password! Please, provider these require policies:  ${messageLength} | ${messageRequireUpperCase} | ${messageSpecialCharacter} `
			});
		}
		return true;
	}),
	profilePicture: Joi.string(),
	privileges: Joi.string().not("root").messages({
		"any.invalid": "You can't create a root user, please create an admin user, if you really need provider a new root user, contact the dev"
	})
});