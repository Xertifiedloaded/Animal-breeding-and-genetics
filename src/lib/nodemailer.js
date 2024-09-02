import nodemailer from "nodemailer";
const productionUrl = "ncbowkqipaclghnz";
const localUrl = "gghllvlccbfdxupv";
const productionMail='sandaaj@funaab.edu.ng'
const localMail='horllypizzy@gmail.com'
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: productionMail,
    pass: productionUrl,
  },
});

export default transporter;
