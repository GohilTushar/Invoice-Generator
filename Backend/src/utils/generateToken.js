import jwt from "jsonwebtoken";
import { JWTPRIVATEKEY } from "../config/config.js";

const generateAuthToken = (payload) => {
  const token = jwt.sign(payload, JWTPRIVATEKEY, {
    expiresIn: "1d",
  });
  return token;
};

export default generateAuthToken;
