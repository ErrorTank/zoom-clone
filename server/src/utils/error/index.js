import { Errors } from "./errors";

const createCustomError = () => {
  return class extends Error {
    constructor(config = {}) {
      super(id);
      const { id, data } = config;
      const errorConfig = Errors[id] || Errors.DEFAULT_ERROR;
      const { id: errorID, code, message = "" } = errorConfig;
      Error.captureStackTrace(this, this.constructor);
      this.isCustom = true;
      this.name = errorID;
      this.status = code;
      this.data = data;
      this.message = message;
    }
  };
};

const AppError = createCustomError();

export default AppError;
