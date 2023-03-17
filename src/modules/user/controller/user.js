import userModel from "../../../../DB/model/User.model.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res, next) => {
  try {
    console.log({ age: req.query.age + 5 });
    const users = await userModel.find({
      $or: [
        // [20 25]
        {
          age: {
            $gte: req.query.age,
            $lte: parseInt(req.query.age) + 5,
          },
        },
        {
          confirmEmail: false,
        },
      ],
    });
    return res.json({ message: "Done", users });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    return user
      ? res.json({ message: "Done", user })
      : res.json({ message: "not registered account" });
  } catch (error) {
    if (error.message) {
      return res.json({ message: error.message });
    }
    return res.json({ message: "Catch Error", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { age } = req.body;
    console.log({ id, age });

    const user = await userModel
      .findByIdAndUpdate(id, { age }, { new: true })
      .select("-password");
    return user
      ? res.json({ message: "Done", user })
      : res.json({ message: "In-valid AccountID" });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await userModel.findByIdAndDelete({ _id: id });
    return user
      ? res.json({ message: "Done", user })
      : res.json({ message: "In-valid AccountID" });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};
