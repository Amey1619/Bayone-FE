import * as bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../middleware/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: `Signup successful ${user.username}`,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Amey loggs: ",username, password);

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: `Login successful: ${user.username}`,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
