import { PasswordPolicies } from "./PasswordPolicies";

function isValidLength(password : string, validLength : number) {
	return password.length >= validLength;
}

function containsSpecialCharacter(password : string) {
	return /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
}

function containsUpperCase(password : string) {
	const splitedPassword =  password.split("");
	const result = splitedPassword.find(char => char == char.toUpperCase() && /[A-Za-z]/.test(char)) ? true : false;
	return result;
}

export function isValidPassword(password :string, {length,requireSpecialCharacter,requireUpperCase} : PasswordPolicies) {
	const results : Array<boolean> = [];
	results.push(isValidLength(password, length));
	if(requireSpecialCharacter) {
		results.push(containsSpecialCharacter(password));
	} 
	if (requireUpperCase) {
		results.push(containsUpperCase(password));
	}
	const isValid = results.every(result => result === true);
	return isValid;

}