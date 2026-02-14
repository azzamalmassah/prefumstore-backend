import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database is connected");
    });
    await mongoose.connect(`${process.env.DB_STRING}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();
const port = 3000;
const server = app.listen(port || 3000, () => {
  console.log(`server is up an running on port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("shutting down!!!!!!!!!!!!!");
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("shutting down!!!!!!!!!!!!!");
  server.close(() => {
    process.exit(1);
  });
});
