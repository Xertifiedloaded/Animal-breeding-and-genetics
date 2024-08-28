import User from '@/model/User';
import bcrypt from 'bcryptjs';


const resetPassword = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const { token } = req.query; 
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Password Does Not Match' });
    }

    const { email } = req.decoded; 

    const user = await User.findOne({
      resetToken: token,
      email: email,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await user.save();

    resetPasswordEmail(email, resetLink);

    res.status(200).json({ message: 'Password Reset Successfully', user });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error Resetting Password', error });
  }
};

export default resetPassword;