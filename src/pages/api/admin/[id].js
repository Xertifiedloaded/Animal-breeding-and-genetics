import databaseConnection from "@/lib/database";
import User from "@/model/User";

export default async function handler(req, res) {
  const { id } = req.query;
  await databaseConnection();
  if (req.method === "DELETE") {
    try {
      const deletedadmin = await User.findByIdAndDelete(id);

      if (!deletedadmin) {
        return res.status(404).json({ message: "admin not found" });
      }

      res
        .status(200)
        .json({ message: "Location deleted successfully", deletedadmin });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }

  }  else {
    res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
