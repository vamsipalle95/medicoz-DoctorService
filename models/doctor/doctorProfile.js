import mongoose from "mongoose";

const DR_TYPE_ENUM = ["Allopathy", "Ayurveda", "Homeopathy", "Unani"];
const MEDICAL_COUNCIL_ENUM = ["1", "2", "3"];

const doctorProfileSchema = new mongoose.Schema(
    {
        verified:{type:Boolean, default:false},
        profilePic: { img: { type: String, default: "" } },
        age: { type: Number },
        doctor_uniqueId: { type: String, trim: true, default:"" },
        dr_type: { type: String, required: true, trim: true, enum: DR_TYPE_ENUM },
        medical_reg_number: { type: Number, required: true, trim: true },
        state_medical_council: {
            type: String,
            required: true,
            trim: true,
            enum: MEDICAL_COUNCIL_ENUM,
        },
        medical_reg_year: { type: Number, required: true },
        certificate: { img: { type: String, required: true } },
        kyc: {
            document_type: { type: String, required:true },
            document_image: { type: String, required:true },
        },
        degree: { type: String, trim: true },
        university_college_name: { type: String, trim: true },
        year_degree_completion: { type: Number },
        speciality_department: { type: String, trim: true },
        specialization_type: { type: String, trim: true },
        other_specializations: { type: String, trim: true },
        experience: { type: Number },
        current_working_status: { type: String, trim: true },
        current_location: { type: String, trim: true },
        languages_spoken: { type: [String], trim: true },
        bank_details: {
                bank_name: { type: String, trim: true, default:'' },
                account_number: { type: Number, default:null },
                bank_location: { type: String, default:'' },
                ifsc_code: { type: String, default:'' },
            },
        signature: { type: String, trim: true },
        socialMedia_links: {
                facebook: { type: String, trim: true, default:'' },
                instagram: { type: String, trim: true, default:'' },
                linkedin: { type: String, trim: true, default:'' },
                youtube: { type: String, trim: true, default:'' },
            },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);
