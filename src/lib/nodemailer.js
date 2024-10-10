import nodemailer from "nodemailer";
const productionUrl = process.env.PRODUCTION_URL;
const productionMail = process.env.PRODUCTION_MAIL;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: productionMail,
    pass: productionUrl,
  },
});

export default transporter;
