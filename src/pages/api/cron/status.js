
import { checkWebsiteHealth } from "../../../lib/report";


export default async function handler(req, res) {
    const authHeader = req.headers.authorization;


    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ success: false });
    }

    if (req.method === 'GET') {
        try {
            const report = await checkWebsiteHealth();
            return res.status(200).json({ message: 'Health report fetched successfully', report });
        } catch (error) {
            console.error('Error during health check:', error);
            return res.status(500).json({ error: 'Failed to fetch health report' });
        }
    }
  
    if (req.method === 'POST') {
        try {
            const report = await checkWebsiteHealth();
            await sendEmailReport(report);
            return res.status(200).json({ message: 'Health report sent successfully', report });
        } catch (error) {
            console.error('Error during health check or email sending:', error);
            return res.status(500).json({ error: 'Failed to send health report' });
        }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}

























// export default async function handler(req, res) {
//     const authHeader = req.headers.authorization;
    
//     if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
//       return res.status(401).json({ success: false });
//     }
  
//     if (req.method === 'POST') {
//       try {
//         const report = await checkWebsiteHealth();
//         await sendEmailReport(report);
//         return res.status(200).json({ message: 'Health report sent successfully', report });
//       } catch (error) {
//         console.error('Error during health check or email sending:', error);
//         return res.status(500).json({ error: 'Failed to send health report' });
//       }
//     } else {
//         res.setHeader('Allow', ['GET', 'POST']);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }