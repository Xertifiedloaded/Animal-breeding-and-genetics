
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'horllypizzy@gmail.com',
    pass: 'gghllvlccbfdxupv',
  },
});

export default transporter;