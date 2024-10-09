import Joi from "joi";
import { prisma } from "../../../lib/prisma";
import databaseConnection from "../../../lib/database";
import transporter from "../../../lib/nodemailer";
import { generateAdminMailNotification, generateFeedbackEmail } from "../../../lib/GenerateFeedBackEmail";


export const alumniSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "firstName is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "lastName is required",
  }),
  emailAddress: Joi.string().email().required().messages({
    "string.empty": "emailAddress is required",
    "string.email": "emailAddress must be a valid email",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.empty": "phoneNumber is required",
  }),
  graduatedYear: Joi.string().required().messages({
    "string.empty": "graduatedYear is required",
  }),
  previousJob: Joi.string().allow(""),
  currentJob: Joi.string().allow(""),
  locationOrCountry: Joi.string().required().messages({
    "string.empty": "locationOrCountry is required",
  }),
  supervisor: Joi.string().required().messages({
    "string.empty": "supervisor is required",
  }),
  advice: Joi.string().required().messages({
    "string.empty": "advice is required",
  }),
  middleName: Joi.string().allow(""),
  social: Joi.string().allow(""),
  sentAt: Joi.date().default(Date.now),
});

export default async function handler(req, res) {
  const { method } = req;
  await databaseConnection(); 

  switch (method) {
    case "GET":
      try {
        const alumni = await prisma.alumniInformation.findMany({
          orderBy: {
            sentAt: "desc",
          },
        });
        res.status(200).json({ success: true, data: alumni });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const { error, value } = alumniSchema.validate(req.body, {
          abortEarly: false,
        });

        if (error) {
          const validationErrors = {};
          error.details.forEach((item) => {
            validationErrors[item.path[0]] = item.message.replace(/"/g, "");
          });

          return res.status(400).json({
            success: false,
            errors: validationErrors,
          });
        }

        const sentAtDate = value.sentAt ? new Date(value.sentAt) : new Date();

        const alumni = await prisma.alumniInformation.create({
          data: {
            ...value,
            sentAt: sentAtDate,
          },
        });

        const {
          firstName,
          middleName,
          lastName,
          emailAddress,
          phoneNumber,
          graduatedYear,
          supervisor,
          locationOrCountry,
          previousJob,
          currentJob,
          advice,
          social
        } = value;


        const adminMailOptions = {
          from: emailAddress,
          to: "sandaaj@funaab.edu.ng",
          subject: "New Form Received",
          html: generateAdminMailNotification(
            firstName,
            middleName,
            lastName,
            emailAddress,
            phoneNumber,
            graduatedYear,
            supervisor,
            locationOrCountry,
            previousJob,
            currentJob,
            advice,
            social
          ),
        };

        const customerMailOptions = {
          from: "sandaaj@funaab.edu.ng",
          to: emailAddress,
          subject: "Thank You for Your Response",
          html: generateFeedbackEmail(
            firstName,
            middleName,
            lastName,
            emailAddress,
            phoneNumber,
            graduatedYear,
            supervisor,
            locationOrCountry,
            previousJob,
            currentJob,
            advice,
            social
          ),
        };


        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);
        
        res.status(201).json({ success: true, data: alumni });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
