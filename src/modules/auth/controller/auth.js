import userModel from "../../../../DB/model/User.model.js";
import { hash } from "../../../utils/hashAndCompare.js";

export const getAuthModule = (req, res, next) => {
  return res.json({ message: "Auth module" });
};
// SignUp Function
export const signUp = async (req, res, next) => {
  try {
    const { email, password, userName, cPassword } = req.body;

    if (password != cPassword) {
      return res.json({ message: "password misMatch cPassword" });
    }

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: " Email exist" });
    }

    const hashPassword = hash({
      plainText: password,
      saltRound: process.env.SALTROUND,
    });

    const user = await userModel.create({
      email,
      password: hashPassword,
      userName,
    });

    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};
// Login Function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "In-valid Email" });
    }
    const match = compare({ plainText: password, hashValue: user.password });
    if (!match) {
      res.json({ message: "In-valid password" });
    }

    const token = generateToken({
      payload: { id: user._id, isLoggedIn: true },
      expiresIn: 60 * 60,
    });
    return res.json({ message: "Done", token });
  } catch (error) {
    return res.json({ message: "Catch error", error, stack: error.stack });
  }
};
