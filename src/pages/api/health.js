import { checkWebsiteHealth, sendEmailReport } from "../../lib/report";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const report = await checkWebsiteHealth();
      await sendEmailReport(report);
      return res.status(200).json({ message: 'Health report sent successfully', report });
    } catch (error) {
      console.error('Error during health check or email sending:', error);
      return res.status(500).json({ error: 'Failed to send health report' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}