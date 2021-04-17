import Logger from "../../base/logger";

const isProduction = process.env.NODE_ENV === "production";

const errorHandler = (err, req, res, next) => {
  Logger.err(`Error: `, err);
  if (err.isCustom) {
    res.status(err.status).json({
      name: err.name,
      data: err.data,
      message: err.message,
      stacktrace: isProduction ? null : err.stack,
    });
  } else {
    res.status(500).json({
      name: err.name,
      message: err.message,
      stacktrace: isProduction ? null : err.stack,
    });
  }
};

export default errorHandler;
