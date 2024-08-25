
import { v4 as uuidv4 } from "uuid";

import databaseConnection from "@/lib/database";
import User from "@/model/User";
import transporter from "@/lib/nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await databaseConnection(); // Connect to the database

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + 10);
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const sendResetEmail = {
        from: 'horllypizzy@gmail.com',
        to: user.email,
        subject: "Thank You for Your Response",
        html: resetToken, 
      };
      await transporter.sendMail(sendResetEmail);
    // Send the password reset email
    // await forgetPasswordEmail(email, resetToken);

    res.status(200).json({ message: "Reset link sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Sending Reset Link", error: error.message });
  }
}