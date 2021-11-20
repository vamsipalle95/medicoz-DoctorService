import mongoose from "mongoose";

// const GENDER_ENUM = ["male", "female", "others"];

const hospitalAdminSchema = new mongoose.Schema(
  {
    hospital_name: { type: String, required: true },
    hospital_address: { type: String, required: true },
    hospital_state: { type: String, required: true },
    hospital_district: { type: String, required: true },
    hospital_locality: { type: String, required: true},
    hospital_reg_number: { type: String, required: true },
    hospital_certificate: { type: String, required: true },
    hospital_pic:{type: String, trim: true, default:''},
    gender:{type:String,trim:true},
    age:{type:Number},
    mobilePhone2:{ type:Number,default:null},
    opd_timings:{
        from :{type: String, trim: true},
        to:{type: String, trim: true},
       },
    department:{
        name:{type:String, trim:true},
        phone:{type:Number, trim:true},
      },
    about_me:{type:String, trim:true},
    achievements_awards:[{
        type:String, trim:true
      }],
    social_links:{type:String, trim:true},
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true, trim: true },
    email_token: { type: String, required: true, trim: true },
    email_verify:{ type: String, required: true, default:false},
    isverified: { type: Boolean, required: true, default: false },
    checkbox: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("HospitalAdmin", hospitalAdminSchema);
