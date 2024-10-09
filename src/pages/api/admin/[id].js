import { prisma } from "@/lib/prisma";
import databaseConnection from "@/lib/database";

export default async function handler(req, res) {
  const { id } = req.query;
  await databaseConnection(); 

  if (req.method === "DELETE") {
    try {
      const deletedAdmin = await prisma.user.delete({
        where: { id }, 
      });

      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.status(200).json({ message: "Admin deleted successfully", deletedAdmin });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
