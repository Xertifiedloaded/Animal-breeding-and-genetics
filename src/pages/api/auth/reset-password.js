import bcrypt from "bcryptjs";

import databaseConnection from "@/lib/database";
import User from "@/model/User";

export default async function handler(req, res) {
  await databaseConnection();
  if (req.method === "POST") {
    const { otp, password } = req.body;
    try {
      const user = await User.findByOTP(otp);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired OTP." });
      }

      // Hash the new password
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordOTP = undefined;
      user.resetPasswordOTPExpire = undefined;
      await user.save();
e
      res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}