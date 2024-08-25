// models/AlumniInformation.js
import mongoose from "mongoose";

const AlumniInformationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  graduatedYear: {
    type: String,
    required: true,
  },
  previousJob: {
    type: String,
  },
  currentJob: {
    type: String,
  },
  locationOrCountry: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  advice: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  social: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AlumniInformation ||
  mongoose.model("AlumniInformation", AlumniInformationSchema);