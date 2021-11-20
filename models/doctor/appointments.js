import mongoose from "mongoose";

const GENDER_ENUM = ["male", "female", "others"];

const doctorAppointmentsSchema = new mongoose.Schema(
  {

  },
  { timestamps: true }
);

export default mongoose.model("DoctorAppointments", doctorAppointmentsSchema);
