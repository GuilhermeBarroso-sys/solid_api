import { RecoveryPasswordUseCase } from "../RecoveryPasswordUseCase";

describe("Testing Recovery Password Use Case", () => {
	it("Should throw a User Error (Not Found)", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase({
			create: async () => {return null;},
			createMany: async () => {return null;},
			destroy: async () => {return null;},
			findAll: async () => {return null;},
			destroyMany: async () => {return null;},
			findByEmail: async () => {return null;},
			findUser: async () => {return null;},
			update: async () => {return null;}
		});
		const data = {
			user_id: null,
			recoveryPassword: null,
			newPassword: null
		};
		await expect(recoveryPasswordUseCase.execute(data)).rejects.toThrowError("User not found!");
	});

	it("Should throw a Token Error Because his already been used", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase({
			create: async () => {return null;},
			createMany: async () => {return null;},
			destroy: async () => {return null;},
			findAll: async () => {return null;},
			destroyMany: async () => {return null;},
			findByEmail: async () => {return null;},
			findUser: async () => {return {id: "1", email: "test@gmail.com", password: "123", username: "test"};},
			update: async () => {return null;}
		});
		const data = {
			user_id: "1",
			recoveryPassword: "12345",
			newPassword: "111"
		};
		await expect(recoveryPasswordUseCase.execute(data)).rejects.toThrowError("Invalid Password Token!");
	});

	it("Should be Recovery the Password Without errors", async () => {
		const recoveryPasswordUseCase = new RecoveryPasswordUseCase({
			create: async () => {return null;},
			createMany: async () => {return null;},
			destroy: async () => {return null;},
			findAll: async () => {return null;},
			destroyMany: async () => {return null;},
			findByEmail: async () => {return null;},
			findUser: async () => {return {id: "1", email: "test@gmail.com", password: "123", username: "test"};},
			update: async () => {return null;}
		});
		const data = {
			user_id: "1",
			recoveryPassword: "123",
			newPassword: "111"
		};
		await expect(recoveryPasswordUseCase.execute(data)).resolves.not.toThrow();
	});
});