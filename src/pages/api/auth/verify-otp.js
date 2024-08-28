import databaseConnection from "@/lib/database";
import User from "@/model/User";

export default async function handler(req, res) {
  await databaseConnection();
  if (req.method === "POST") {
    try {
      const { otp } = req.body;
      if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }

      const user = await User.findOne({ otp });
      if (!user) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      user.isVerified = true;
      user.otp = undefined; 
      user.otpExpiry = undefined; 
      await user.save();

      res.status(200).json({ message: "User verified successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}