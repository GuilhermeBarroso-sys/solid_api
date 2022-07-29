import { IPasswordPolicies } from "./IPasswordPolicies";



class PasswordPolicies implements IPasswordPolicies {
	public requireSpecialCharacter = true;
	public requireUpperCase = true;
	public length = 6;
	constructor(passwordPolicies? : IPasswordPolicies ) {
		Object.assign(this , passwordPolicies);
	}
} 

export {PasswordPolicies};