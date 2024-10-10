import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

export const checkWebsiteHealth = async () => {
  const healthCheckResult = {
    status: 'ok',
    uptime: process.uptime(), 
    timestamp: new Date().toISOString(), 
  };
  return healthCheckResult;
};

export const sendEmailReport = async (report) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL, 
    subject: 'Weekly Website Health Report',
    text: JSON.stringify(report, null, 2), 
  };

  await transporter.sendMail(mailOptions);
};
