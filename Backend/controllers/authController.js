import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none", // <-- for cross-origin
      secure: true,      // <-- required for "none"
    });

    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none", // <-- for cross-origin
      secure: true,      // <-- required for "none"
    });

    res.json({
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
