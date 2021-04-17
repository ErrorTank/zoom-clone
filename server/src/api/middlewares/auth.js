import jwt from "jsonwebtoken";
import config from "../../config";
import AuthUtilities from "../../utils/auth";

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const isAuth = (req, res, next) => {
  const token = getTokenFromHeader(req) || "";
  AuthUtilities.verifyAuthenticatedUser(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next(err));
};

export default isAuth;
