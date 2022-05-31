import "dotenv/config";
import express from "express";
import swagger from "swagger-ui-express";
import { routes } from "./routes";
import swaggerDoc from "./docs/swagger.json"; 
const app = express();
app.use(express.json());
app.use(routes);
app.use("/docs", swagger.serve, swagger.setup(swaggerDoc));



app.listen(3000, () => {
	console.log("servidor iniciado com sucesso!");
});


