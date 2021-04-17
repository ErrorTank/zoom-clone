export const Errors = {
  DEFAULT_ERROR: {
    code: 400,
    id: "DEFAULT_ERROR",
  },
  APPLICATION_ERROR: {
    code: 500,
    id: "APPLICATION_ERROR",
  },
  ENV_FILE_NOT_FOUND: {
    code: 400,
    id: "ENV_FILE_NOT_FOUND",
    message: "Couldn't find .env file."
  },
  GENERATE_AUTH_JWT_FAILED: {
    code: 400,
		id: "GENERATE_AUTH_JWT_FAILED"
  },
	GENERATE_AUTH_JWT_FAILED: {
    code: 400,
		id: "GENERATE_AUTH_JWT_FAILED"
  },
	AUTHENTICATE_USER_FAILED: {
		code: 401,
		id: "AUTHENTICATE_USER_FAILED"
	}
};
