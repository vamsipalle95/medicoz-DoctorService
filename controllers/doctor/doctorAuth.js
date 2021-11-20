import Doctor from '../../models/doctor/doctorAuth.js'
import bcrypt from 'bcryptjs'
import generateHash from '../../utils/bcrypt-helper.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import { sendMAIL } from '../../utils/email-service.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()


// function sendMAIL(to, subject, html){
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: `${process.env.USER_MAIL}`,
//             pass: `${process.env.USER_PASS}`
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
    
//     })

//     const mailOptions = {
//         from: `${process.env.USER_MAIL}`,
//         to: to,
//         subject: `${subject}`,
//         html: `${html}`
//     }
//     transporter.sendMail(mailOptions)
// }

const signup = async (req, res) => {
    try {
        const { firstName, lastName, gender, email, password, mobileNumber, checkbox } = req.body;
        let doctor = await Doctor.findOne({ email: email, mobileNumber: mobileNumber })
        if (doctor != undefined) return res.status(403).send({ status: 'failed', message: `doctor with email ${email} or mobile number ${mobileNumber}  already registered` })
        const hashedPassword = await generateHash(password)
        const token = crypto.randomBytes(64).toString('hex')
        const new_doctor = new Doctor({ firstName, lastName, gender, email, password: hashedPassword, mobileNumber, checkbox: checkbox, email_token: token })
        let subject = 'medicoz verify your email'
        let html = `<h2> ${new_doctor.firstName}  ${new_doctor.lastName} Thanks for registering with us </h2>
                     <h4> please verify your mail to continue... </h4>
                     <a href="http://${req.headers.host}/api/verify-email?token=${new_doctor.email_token}">Verify your mail</a>
                     `
        await sendMAIL(email, subject, html )
        const saved_doctor = await new_doctor.save()
        if (saved_doctor != null) return res.status(201).json({ status: 'success', message: 'successfully created a new doctor' })
    } catch (err) {
        res.status(500).send({ status: 'failed', message: err.message })
    }
}

/* To verifiy the registered doctor */
const emailVerification = async (req, res) => {
    try {
        const { token } = req.query
        const doctor = await Doctor.findOneAndUpdate({ email_token: token }, { "$set": { "email_token": null, "isverified": true } })
        if (doctor) return res.status(200).send({ status: "success", message: "successfully verified email" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}


const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let doctor = await Doctor.findOne({ email: email })
        if (!doctor) return res.status(404).send({ status: 'error', message: `email ${email} not found` })
        if (doctor.isverified == false) return res.status(400).send({ status: "failed", message: "please verify you email" })
        let doMatch = await bcrypt.compare(password, doctor.password)
        if (doMatch) {
            const token = jwt.sign({ doctorId: doctor.id }, process.env.SECRET_CODE, { expiresIn: '2h' });
            return res.status(200).send({ token: token })
        }
        return res.status(400).send({ status: 'failed', message: "password or email wrong" })
    } catch (err) {
        res.status(500).send({ status: 'failed', message: err.message })
    }
}

/* To reset password email link will be sent to the user mail*/
const forgotPasswordEmail = async (req, res) => {
    try {
        let { email } = req.body
        let doctor = await Doctor.findOne({ email: email })
        if (!doctor) return res.status(404).send({ status: 'error', message: `email ${email} not found` })
        if (doctor.isverified == false) return res.status(400).send({ status: "failed", message: `please verify your email ${email}` })
        let id = doctor._id
        const token = crypto.randomBytes(64).toString('hex')
        let subject = 'Medicoz: Reset Your Password'
        let html = `<h4> click link expires </h4>
                   <a href="http://${req.headers.host}/api/reset-password/${id}?token=${token}">update password link</a>
                   `
        await sendMAIL(email,subject,html)
        res.send({message:"reset Link has been sent to your mail"})
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}

/* to reset the password  */
const resetPassword = async (req, res) => {
    try {
        const { id } = req.params
        let { password, confirmPassword } = req.body
        if (password !== confirmPassword) return res.status(400).send({ status: "failed", message: "make sure password and confirm password are same" })
        const hashedPassword = await generateHash(password)
        const doctor = await Doctor.findByIdAndUpdate({ _id: id }, { "$set": { password: hashedPassword } })
        if (doctor) return res.status(200).send({ status: "success", message: "successfully updated password" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}

/* only super admin can access to verify the Hospital */
const getAllDoctorProfiles = async (req, res) => {
    try{
        const doctor = await Doctor.find()
        if(doctor.length < 0) return res.status(200).send({message:"No doctor registered yet"})
        res.status(200).send({status:"success", data: doctor})
    }catch(err){
        res.status(500).send({ status: "failed", message: err.message })
    }
}

export { signup, emailVerification, login, forgotPasswordEmail, resetPassword, getAllDoctorProfiles }