import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
import friendRoutes from "./routes/friendRoutesAuth";
import { Request, Response } from "express";
import { ApiError } from "./errors/errors";
import logger, { stream } from "./middleware/logger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev";
app.use(require("morgan")(morganFormat, { stream }));
app.set("logger", logger);
const Cors = require("cors");

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/friends", Cors(), friendRoutes);

//404 handlers for api-requests
app.use("/api", (request: Request, response: Response, next: Function) => {
  response.status(404).json({ errorCode: 404, msg: "Path does not exist" });
});

app.use((error: any, request: Request, response: Response, next: Function) => {
  if (error instanceof ApiError) {
    if (error.errorCode != undefined)
      response
        .status(error.errorCode)
        .json({ errorCode: error.errorCode, msg: error.message });
  } else {
    next(error);
  }
});

export default app;
