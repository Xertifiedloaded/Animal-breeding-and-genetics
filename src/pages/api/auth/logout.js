import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      
      const cookie = serialize("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0), 
        path: "/",
      });

      res.setHeader("Set-Cookie", cookie);
      res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}