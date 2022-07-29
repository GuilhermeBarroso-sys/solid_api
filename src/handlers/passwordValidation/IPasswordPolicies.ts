import { PasswordPolicies } from "./PasswordPolicies";
export interface IPasswordPolicies {
	length?: number
	requireSpecialCharacter?: boolean
	requireUpperCase?: boolean
}