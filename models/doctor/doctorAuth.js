import mongoose from "mongoose";

const GENDER_ENUM = ["male", "female", "others"];

const doctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: GENDER_ENUM },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true, unique: true, trim: true },
    email_token:{type: String, required: true, unique: true, trim: true},
    isverified :{type: Boolean, default: false},
    checkbox: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
