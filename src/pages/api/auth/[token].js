
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import databaseConnection from "@/lib/database";
import User from "@/model/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { newPassword, confirmNewPassword } = req.body;
    const { token } = req.query; 

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    await databaseConnection();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        email: decoded.email,
        verificationToken: token,
        verificationTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Token is invalid or has expired." });
      }

      user.password = await bcrypt.hash(newPassword, 12);
      user.verificationToken = undefined;
      user.verificationTokenExpiry = undefined;

      await user.save();

      res.status(200).json({ message: "Password has been reset." });
    } catch (error) {
      console.error('Error verifying token or updating password:', error);
      res.status(500).json({ message: "Server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
