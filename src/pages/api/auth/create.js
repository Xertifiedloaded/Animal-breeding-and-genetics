
import databaseConnection from "@/lib/database";
import User from "@/model/User";


export default async function handler(req, res, next) {
  await databaseConnection();
  if (req.method === "POST") {
    const { name, email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = await User.create({name,email,password});
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
