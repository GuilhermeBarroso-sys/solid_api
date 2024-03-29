import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import swagger from "swagger-ui-express";
import { routes } from "./routes";
import cors from "cors";
import { hashSync } from "bcryptjs";
import { randomUUID } from "crypto";
const app = express();
app.use(cors({
	// origin: process.env.production ? "production_react_link" : "*"
	origin: "*"
}));
app.use(express.json());
app.use(
	rateLimit({
		windowMs: 1000 * 60 * 3,
		max: 100,
		message: "You exceeded the max of requests allowed",
		statusCode: 429,
		headers: true,
	})
);
app.use(routes);
const port = process.env.PORT;
app.listen(port, process.env.NODE_ENV == "development" && (() => {
	console.log("Server running at port", port);
}));


