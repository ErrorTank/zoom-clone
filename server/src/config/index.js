import dotenv from "dotenv";
import path from "path";
import AppError from "../utils/error";

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  const envFound = dotenv.config({
    path: path.resolve(__dirname, "../../env/.env"),
  });
  if (envFound.error) {
    throw new AppError({ id: "ENV_FILE_NOT_FOUND" });
  }
}

export default {
  port: parseInt(process.env.PORT, 10),
  api: {
    prefix: "/api",
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
};
