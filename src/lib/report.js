import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import { generateApiCheckMessages, generateEmailTemplate } from './StatusTemplate';
import databaseConnection from './database';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const checkInternalApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { status: 'fail', message: `${url} returned status ${response.status}` };
    }
    return { status: 'ok', message: `${url} is working` };
  } catch (error) {
    return { status: 'fail', message: `${url} could not be reached: ${error.message}` };
  }
};

export const checkWebsiteHealth = async () => {
    const healthCheckResult = {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      status: 'ok',
      databaseStatus: 'ok',
    };
  
    try {
      await databaseConnection(); 
    } catch (error) {
      console.error('Database connection failed:', error.message);
      healthCheckResult.databaseStatus = 'fail';
      healthCheckResult.status = 'fail'; 
    }
  
    const thresholdUptime = 60;
    if (process.uptime() < thresholdUptime) {
      healthCheckResult.status = 'weak';
    }
  
    const downtime = Math.random() > 0.8;
    if (downtime) {
      healthCheckResult.status = 'fail';
    }
  
    if (healthCheckResult.status !== 'fail') {
        const apiChecks = [
            { url: process.env.SIGNUP_URL, name: 'Signup page' },
            { url: process.env.LOGIN_URL, name: 'Login' },
            { url: process.env.FORGET_PASSWORD_URL, name: 'Forget Password' },
            { url: process.env.OTP_URL, name: 'OTP' },
            { url: process.env.MAIN_WEBSITE_URL, name: 'Main Website' },
        ];
        
      healthCheckResult.apiChecks = [];
      for (const { url, name } of apiChecks) {
        const apiCheckResult = await checkInternalApi(url);
        if (apiCheckResult.status === 'fail') {
          healthCheckResult.status = 'fail';
        }
        healthCheckResult.apiChecks.push({ name, ...apiCheckResult });
      }
    }
  
    return healthCheckResult;
  };
  




export const sendEmailReport = async (report) => {
  const { uptime, timestamp, status, apiChecks, databaseStatus } = report;
  const apiCheckMessages = generateApiCheckMessages(apiChecks);
  const mailOptions = {
    to: 'makindeolaitan01@gmail.com',
    subject: 'Weekly Website Health Report',
    html: generateEmailTemplate(timestamp, uptime, status, apiCheckMessages, databaseStatus),
  };

  await transporter.sendMail(mailOptions);
};
