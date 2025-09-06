import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true, collection: "login-details" }); // <-- set collection name here

export default mongoose.model("User", userSchema);
