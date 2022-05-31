import { getMockReq, getMockRes } from "@jest-mock/express";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { ensureAuthenticate } from "../ensureAuthenticate";
describe("Testing authenticate middleware", () => {
	it("should be able call next function", async() => {
		const userIdMock = v4();
		const token = sign(userIdMock, process.env.JWT_SECRET);
		const request = getMockReq({
			headers: {
				authorization: "Bearer " + token
			}
		});
		const {res : response} = getMockRes();
		const nextFunctionMock = {
			next: () => {}
		};
		jest.spyOn(nextFunctionMock, "next");
		const {next} = nextFunctionMock;
		await ensureAuthenticate(request, response, next);
		expect(next).toHaveBeenCalled();
	});
	it("should be return error because token is empty", async () => {
		const userIdMock = v4();
		const request = getMockReq({});
		const {res : response} = getMockRes();
		const nextFunctionMock = {
			next: () => {}
		};
		jest.spyOn(nextFunctionMock, "next");
		const {next} = nextFunctionMock;
		await ensureAuthenticate(request, response, next);
		expect(response.status).toBeCalledWith(401);
		expect(response.json).toBeCalledWith("Token Not Found");
	});

	it("Should be return catch error", async () => {
		const {res : response} = getMockRes();
		const request = getMockReq({
			headers: {
				authorization: "invalid token"
			}
		});
		const nextFunctionMock = {
			next: () => {}
		};
		jest.spyOn(nextFunctionMock, "next");
		const {next} = nextFunctionMock;
		await ensureAuthenticate(request, response, next);
		expect(response.status).toBeCalledWith(401);
		expect(response.json).toBeCalledWith("jwt malformed");
	});
});