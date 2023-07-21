import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL =
    "mongodb+srv://prakharsaraswatcsda20:x1C3ainBXtCGCjdK@cluster0.cmjvv2h.mongodb.net/?retryWrites=true&w=majority";
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Error while connecting to the database.", error);
  }
};

export default Connection;
