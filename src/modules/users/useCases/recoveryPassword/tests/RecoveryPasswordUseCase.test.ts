import { hash, hashSync } from "bcryptjs";
import { UserRepositoryMock } from "../../../../../mocks/users/userRepositoryMock";
import { RecoveryPasswordUseCase } from "../RecoveryPasswordUseCase";

describe("Testing Recovery Password Use Case", () => {
	it("Should throw a User Error (Not Found)", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase(UserRepositoryMock(null));
		const data = {
			user_id: null,
			recoveryPassword: null,
			newPassword: null
		};
		await expect(recoveryPasswordUseCase.execute(data)).rejects.toThrow();
	});

	it("Should throw a Token Error Because his already been used", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase(UserRepositoryMock());
		const data = {
			user_id: "1",
			recoveryPassword: "12345",
			newPassword: "111"
		};
		await expect(recoveryPasswordUseCase.execute(data)).rejects.toThrow();
	});

	it("Should be Recovery the Password Without errors", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase(UserRepositoryMock({
			password: "123"
		}));
		const data = {
			user_id: "1",
			recoveryPassword: "123",
			newPassword: "111"
		};
		await expect(recoveryPasswordUseCase.execute(data)).resolves.not.toThrow();
	});
});