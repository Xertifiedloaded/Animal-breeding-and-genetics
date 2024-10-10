
export default function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
    const authHeader = request.headers['authorization'];
    if (
        !process.env.CRON_SECRET ||
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return response.status(401).json({ success: false, message: 'Unauthorized' });
    }

    response.status(200).json({ message: 'code ran' + new Date() },);
}
