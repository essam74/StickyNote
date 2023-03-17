import noteModel from "../../../../DB/model/Note.model.js";
import userModel from "../../../../DB/model/User.model.js";

export const getNoteModule = async (req, res, next) => {
  const notes = await noteModel.find({}).populate([
    {
      path: "userId",
      select: "userName email",
    },
  ]);
  return res.json({ message: "Done", notes });
};

export const addNote = async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ message: "In-valid userId" });
    }
    const note = await noteModel.create({ title, description, userId });
    return res.json({ message: "Done", note });
  } catch (error) {
    return res.json({ message: "Catch error", error });
  }
};
