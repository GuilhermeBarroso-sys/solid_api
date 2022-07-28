import "dotenv/config";
import serverless from "serverless-http";
import express from "express";
import swagger from "swagger-ui-express";
import { routes } from "./routes";
import swaggerDoc from "./docs/swagger.json"; 
const app = express();
app.use(express.json());
app.use(routes);
app.use("/docs", swagger.serve, swagger.setup(swaggerDoc));
app.use(routes);
app.get("/test", (request, response) => {
	return response.status(200).json({
		message: "Hello worlddddddd!",
		test: process.env.DATABASE_URL
	});
});
module.exports.handler = serverless(app);




