import Logger from "../../base/logger";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import config from "../../config";
import AppError from "../error";

const getAuthKeypair = () => {
  return {
    privateKey: fs.readFileSync(
      path.resolve(__dirname, "../../constants/auth/keys/private.key"),
      "utf8"
    ),
    publicKey: fs.readFileSync(
      path.resolve(__dirname, "../../constants/auth/keys/private.key"),
      "utf8"
    ),
  };
};

const { publicKey, privateKey } = getAuthKeypair();

const generateUserAuthenticationToken = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  Logger.silly(`Sign JWT for userId: ${user.id}`);

  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      privateKey,
      {
        algorithm: config.jwtAlgorithm,
      },
      (err, token) => {
        if (err) {
          reject(new AppError({ id: "GENERATE_AUTH_JWT_FAILED" }));
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyAuthenticatedUser = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: config.jwtAlgorithm,
      },
      (err, user) => {
        if (err) {
          reject(new AppError({ id: "AUTHENTICATE_USER_FAILED", data: {} }));
        } else {
          resolve(user);
        }
      }
    );
  });
};

const AuthUtilities = {
  generateUserAuthenticationToken,
  getAuthKeypair,
  verifyAuthenticatedUser,
};

export default AuthUtilities;
