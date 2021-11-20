import HospitalAdmin from '../../models/hospital/hospital-adminAuth.js'
import bcrypt from 'bcryptjs'
import generateHash from '../../utils/bcrypt-helper.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import { sendMAIL } from '../../utils/email-service.js'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()


const signup = async (req, res) => {
    try {
        const { hospital_name, hospital_address, hospital_state, hospital_locality, hospital_district, hospital_reg_number, firstName, lastName, designation, email, password, mobileNumber, checkbox } = req.body;
        const hospital_certificate = req.files.hospitalCertificate[0].path
        let hospital = await HospitalAdmin.findOne({ email: email, mobileNumber: mobileNumber })
        if (hospital != undefined) return res.status(403).send({ status: 'failed', message: `hospital admin with email ${email} or mobile number ${mobileNumber} already registered` })
        const hashedPassword = await generateHash(password)
        const token = crypto.randomBytes(64).toString('hex')
        const new_hospital = new HospitalAdmin({ 
            hospital_name: hospital_name, 
            hospital_address: hospital_address, 
            hospital_state: hospital_state, 
            hospital_locality: hospital_locality, 
            hospital_district: hospital_district, 
            hospital_reg_number: hospital_reg_number, 
            hospital_certificate: hospital_certificate, 
            firstName: firstName, 
            lastName: lastName, 
            designation: designation, 
            email: email, 
            password: hashedPassword, 
            mobileNumber: mobileNumber, 
            checkbox: checkbox, 
            email_token: token })
        const save_hospital = await new_hospital.save()
        if (save_hospital != null) {
            let subject = 'medicoz verify your email'
            let html = `<h2> ${firstName}  ${lastName} Thanks for registering with us </h2>
                         <h4> please verify your mail to continue... </h4>
                         <a href="http://${req.headers.host}/api/hospital-admin/verify-email?token=${token}">Verify your mail</a>
                        `
            await sendMAIL(email, subject, html)
            return res.status(201).json({ status: 'success', message: 'successfully created a new hospital admin' })
        }

    } catch (err) {
        res.status(500).send({ status: 'failed', message: err.message })
    }
}

/* mail verification link which we will be in the registered user */
const emailVerification = async (req, res) => {
    try {
        const { token } = req.query
        const admin = await HospitalAdmin.findOneAndUpdate({ email_token: token }, { "$set": { "email_token": null, "isverified": true } })
        if (admin) return res.status(200).send({ status: "success", message: "successfully verified email" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}


const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let admin = await HospitalAdmin.findOne({ email: email })
        if (!admin) return res.status(404).send({ status: 'error', message: `email ${email} not found` })
        if (admin.isverified == false) return res.status(400).send({ status: "failed", message: "please verify you email" })
        let doMatch = await bcrypt.compare(password, admin.password)
        if (doMatch) {
            const token = jwt.sign({ hospital_adminId: admin.id }, process.env.SECRET_CODE, { expiresIn: '2h' });
            return res.status(200).send({ token: token })
        }
        return res.status(400).send({ status: 'failed', message: "password or email wrong" })
    } catch (err) {
        res.status(500).send({ status: 'failed', message: err.message })
    }
}

/* email sent to reset password */
const forgotPasswordEmail = async (req, res) => {
    try {
        let { email } = req.body
        let hospitalAdmin = await HospitalAdmin.findOne({ email: email })
        if (!hospitalAdmin) return res.status(404).send({ status: 'error', message: `email ${email} not found` })
        if (hospitalAdmin.isverified == false) return res.status(400).send({ status: "failed", message: `please verify your email ${email}` })
        let id = hospitalAdmin._id
        const token = crypto.randomBytes(64).toString('hex')
        let subject = 'Medicoz: Reset Your Password'
        let html = `<h4> click link expires </h4>
                   <a href="http://${req.headers.host}/api/hospital-admin/reset-password/${id}?token=${token}">update password link</a>
                   `
        await sendMAIL(email, subject, html)
        res.send({ message: "reset Link has been sent to your mail" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}

/* can be accessed only by link sent to the registered user mail */
const resetPassword = async (req, res) => {
    try {
        const { id } = req.params
        let { password, confirmPassword } = req.body
        if (password !== confirmPassword) return res.status(400).send({ status: "failed", message: "make sure password and confirm password are same" })
        const hashedPassword = await generateHash(password)
        const hospitalAdmin = await HospitalAdmin.findByIdAndUpdate({ _id: id }, { "$set": { password: hashedPassword } })
        if (hospitalAdmin) return res.status(200).send({ status: "success", message: "successfully updated password" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}


/* only super admin can access to verify the Hospital */
const getAllHospitalProfiles = async (req, res) => {
    try{
        const allHospitals = await HospitalAdmin.find()
        if(allHospitals.length < 0) return res.status(200).send({message:"No Hospital registered yet"})
        res.status(200).send({status:"success", data: allHospitals})
    }catch(err){
        res.status(500).send({ status: "failed", message: err.message })
    }
}

export { signup, emailVerification, login, forgotPasswordEmail, resetPassword, getAllHospitalProfiles }