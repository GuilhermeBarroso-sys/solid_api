import { getMockReq, getMockRes } from "@jest-mock/express";
import { v4 as uuid } from "uuid";
import { SendEmailToRecoveryPasswordController } from "../SendEmailToRecoveryPasswordController";
import { SendEmailToRecoveryPasswordUseCase } from "../SendEmailToRecoveryPasswordUseCase";

describe("Testing Send Email To Recovery Password Controller", () => {
	it("should be return a status code 200", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const execute : Promise<{
			user_id: string;
			passwordToken: string;
		}> = async (email: string) => {
			return  {
				user_id:uuid(), 
				passwordToken: "12312312"
			};
		};
		const sendEmailToRecoveryPasswordUseCaseMock  = {
			execute: async (email : string) => {return null;}
		};
    
		const sendEmailToRecoveryPasswordControllerMock = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCaseMock);
		await sendEmailToRecoveryPasswordControllerMock.handle(request, response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(200);
	});
	it("should be return a status code 404", async () => {
		const request = getMockReq({
			recoveryPassword: "1234122",
			body: {
				newPassword: "test",
				user_id: uuid()
			}
		});
		const {res : response} = getMockRes();
		const sendEmailToRecoveryPasswordUseCaseMock = {
			execute: async () => {throw new Error("");}
		};
		const sendEmailToRecoveryPasswordControllerMock = new SendEmailToRecoveryPasswordController(sendEmailToRecoveryPasswordUseCaseMock);
		await sendEmailToRecoveryPasswordControllerMock.handle(request, response);
		expect(request).toHaveProperty("recoveryPassword");
		expect(response.status).toBeCalledWith(400);
	});

});