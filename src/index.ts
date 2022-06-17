import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import swagger from "swagger-ui-express";
import { routes } from "./routes";
import swaggerDoc from "./docs/swagger.json"; 
const app = express();
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
app.use("/docs", swagger.serve, swagger.setup(swaggerDoc));
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running at port ", port);
});


