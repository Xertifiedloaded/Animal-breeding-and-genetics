
export default function handler(req, res) {
    let ip =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    if (ip.includes('::1')) {
      ip = '127.0.0.1'; 
    } else if (ip.includes(',')) {
      ip = ip.split(',')[0];
    }
  
    res.status(200).json({ ip });
  }
  