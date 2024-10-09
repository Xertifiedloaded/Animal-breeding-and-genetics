import { prisma } from '@/lib/prisma'; 
import databaseConnection from '@/lib/database'; 

export default async function handler(req, res) {
  await databaseConnection(); 

  if (req.method === 'GET') {
    try {
      const admins = await prisma.user.findMany({
        select: { 
          id: true,
          name: true,
          email: true,
          profilePicture: true 

        },
      });
      res.status(200).json(admins);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
