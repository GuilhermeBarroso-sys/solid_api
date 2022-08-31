import Joi from "joi";
import { isValidPassword } from "../../../../../../handlers/passwordValidation";
import { PasswordPolicies } from "../../../../../../handlers/passwordValidation/PasswordPolicies";
export const schema = Joi.object({
	user_id: Joi.string().uuid().required(),
	newPassword: Joi.string().min(6).required().custom((value, helper) => {
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
});