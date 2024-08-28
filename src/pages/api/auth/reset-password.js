import bcrypt from 'bcryptjs';
import databaseConnection from '@/lib/database';
import User from '@/model/User';

export default async function handler(req, res) {
  await databaseConnection();

  if (req.method === 'POST') {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.query; 

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
    
      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpiry: { $gt: new Date() },
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
    
      user.password = hashedPassword;
      user.verificationToken = null; 
      user.verificationTokenExpiry = null; 

      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}