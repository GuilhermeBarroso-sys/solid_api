import Joi from "joi";
import { isValidPassword } from "../../../../../../handlers/passwordValidation";
import { PasswordPolicies } from "../../../../../../handlers/passwordValidation/PasswordPolicies";
export const schema = Joi.object({
	id: Joi.string().uuid().required().messages({
		"string.guid": "Please, provider a valid uuid"
	}),
	username: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string().min(6).custom((value, helper) => {
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
		"any.invalid": "You can't create an admin or root user, please create an admin user, if you really need provider a new root user, contact the dev"
	})
});