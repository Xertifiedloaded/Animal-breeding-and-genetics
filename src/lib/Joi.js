import Joi from "joi";
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
    middleName: Joi.string().required().messages({
      "string.empty": "middleName is required",
    }),
    social: Joi.string().required().messages({
      "string.empty": "social is required",
    }),
    sentAt: Joi.date().default(Date.now),
  });