import databaseConnection from "@/lib/database"
import { generateOTP } from "@/utils/Otp"
import jwt from "jsonwebtoken"
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"
import { generateSignupOtpEmail } from "../../../lib/generateOtpAndResetPasswordNotification"
import transporter from "../../../lib/nodemailer"

export default async function handler(req, res) {
  await databaseConnection();
  const otp = generateOTP(4); 

  if (req.method === "POST") {
    const { name, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const OTPverificationToken = jwt.sign({ otp }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const verificationLink = `https://www.abg-funaab.com.ng/verify/auth/${OTPverificationToken}`;

      const hashedPassword = await bcrypt.hash(password, 10);
      const otpExpiry = new Date(Date.now() + 60 * 60 * 1000);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          otp,
          otpExpiry, 
          password: hashedPassword,
        },
      });

      const otpEmailOption = {
        to: email,
        subject: "Thank You for Registering",
        html: generateSignupOtpEmail(email, otp,verificationLink),
      };
      await transporter.sendMail(otpEmailOption);

      res.status(201).json({
        message: "User created successfully",
        user: {
          ...newUser,
          verificationLink,
          isVerified: false,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
