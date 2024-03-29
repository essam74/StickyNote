import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  signature = process.env.loginsignature,
  expiresIn = 60 * 60,
}) => {
  const token = jwt.sign(payload, signature, {
    expiresIn: parseInt(expiresIn),
  });
  return token;
};

export const verifyToken = ({
  token = "",
  signature = process.env.loginsignature,
}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};
