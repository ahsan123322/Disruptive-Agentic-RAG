import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DBURL = process.env.DBURL;
const connection = async () => {
  try {
    const connect = await mongoose.connect(DBURL);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error);
  }
};
export default connection;
