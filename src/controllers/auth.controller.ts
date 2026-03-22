import User from "../models/user.model";
import OTP from "../models/otp.model";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

// REGISTER
export const register = async (req: any, res: any) => {
  const { name, email, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashed,
  });

  // generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  console.log("OTP:", otp); // for testing

  res.json({ message: "User registered, verify OTP" });

  console.log("BODY:", req.body);
};

export const verifyOTP = async (req: any, res: any) => {
  const { email, otp } = req.body;

  const record = await OTP.findOne({ email, otp });

  if (!record || !record.expiresAt || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  await User.updateOne({ email }, { isVerified: true });

  res.json({ message: "Verified successfully" });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password!);

  if (!match) return res.status(400).json({ message: "Wrong password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken });
};

export const me = async (req: any, res: any) => {
  res.json(req.user);
};
