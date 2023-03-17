import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.LOCALDB)
    .then((result) => {
      console.log(`Db Connected.........`);
    })
    .catch((err) => console.log(`Fail to connectDB ,,,,,,,,,,, ${err}`));
};
export default connectDB;
