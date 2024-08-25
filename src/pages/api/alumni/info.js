import ConfirmationTemplate from "@/lib/ConfirmationTemplate";
import databaseConnection from "@/lib/database";
import { alumniSchema } from "@/lib/Joi";
import transporter from "@/lib/nodemailer";
import ThankYouTemplate from "@/lib/ThankYouTemplate";
import AlumniModel from "@/model/AlumniModel";


export default async function handler(req, res) {
  await databaseConnection();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const alumni = await AlumniModel.find({});
        res.status(200).json({ success: true, data: alumni });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const { error, value } = alumniSchema.validate(req.body, { abortEarly: false });

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

        const alumni = await AlumniModel.create(value);
        const { emailAddress, firstName } = value;
        const adminMailOptions = {
          from: emailAddress,
          to: 'horllypizzy@gmail.com',
          subject: "New Form Received",
          html: ConfirmationTemplate({ firstName, emailAddress }),
        };


        const customerMailOptions = {
          from: 'horllypizzy@gmail.com',
          to: emailAddress,
          subject: "Thank You for Your Response",
          html: ThankYouTemplate({ firstName }), 
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);

        res.status(201).json({ success: true, data: alumni });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}