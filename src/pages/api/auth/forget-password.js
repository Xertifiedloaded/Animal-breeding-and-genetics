
import jwt from 'jsonwebtoken';
import databaseConnection from "@/lib/database";
import User from "@/model/User";
import transporter from '@/lib/nodemailer';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    await databaseConnection();

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

      user.verificationToken = token;
      user.verificationTokenExpiry = Date.now() + 15 * 60 * 1000; 

      await user.save();


      const resetEmail = {

        to: email,
        subject: "Password Reset Token",
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a></p><p>The link is valid for 15 minutes.</p>`,
      };

      await transporter.sendMail(resetEmail);

      res.status(200).json({ message: "Password reset token sent to email." });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: "Server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
