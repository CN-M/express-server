import "colors";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();

import { catch404, errorHandler } from "./middleware/errorMiddleware";
import mainRoute from "./routes/mainRoute";

const { PORT } = process.env;
const port = PORT || 8000;

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", mainRoute);

// Error Middleware
app.use(catch404);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.cyan);
});
