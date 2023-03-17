import userModel from "../../DB/model/User.model.js";

export const auth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ message: "token is required" });
  }
  const decoded = verifyToken({ token, signature: process.env.loginSignature });
  if (!decoded?.id || !decoded?.isLoggedIn) {
    return res.json({ message: "in-valid token signature" });
  }
  const authUser = await userModel
    .findById(decoded.id)
    .select("username email");
  if (!authUser) {
    return res.json({ message: "not registered account" });
  }

  req.user = authUser;
  return next();
};
