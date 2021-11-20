import doctorProfile from '../../models/doctor/doctorProfile.js';

const createProfile = async (req, res) => {
    try {
        const { doctorId } = req.user
        let isProfile = await doctorProfile.findOne({ doctorId: doctorId })
        if (isProfile) return res.send({ status: 'success', message: "profile already exists" })
        const { dr_type, medical_reg_number, state_medical_council, medical_reg_year, document_type } = req.body
        const certificatePath = req.files.images[0].path
        const kycPath = req.files.kyc[0].path
        const profile = new doctorProfile({ doctorId: doctorId, dr_type: dr_type, medical_reg_number: medical_reg_number, state_medical_council: state_medical_council, medical_reg_year: medical_reg_year, "certificate.img": certificatePath, "kyc.document_type": document_type, "kyc.document_image": kycPath })
        const saved_profile = await profile.save()
        if (saved_profile) return res.status(200).send({ status: "success", message: "successfully saved the profile" })
        return res.send({ status: "success", message: "failed to save details" })
    } catch (err) {
        res.status(500).send({ status: 'failed', message: err.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { doctorId } = req.user
        let isProfile = await doctorProfile.findOne({ doctorId: doctorId }).select("verified")
        if (isProfile == null) return res.status(404).send({ status: 'failed', message: "No profile found" })
        const { verified } = isProfile
        if (!verified) return res.status(403).send({ status: "error", message: "please wait till your profile is verified" })
        const {
            age,
            dr_type,
            medical_reg_number,
            state_medical_council,
            medical_reg_year,
            degree,
            university_college_name,
            year_degree_completion,
            speciality_department,
            specialization_type,
            other_specializations,
            experience,
            current_working,
            current_location,
            languages_spoken,
            document_type,
            bank_name,
            account_number,
            bank_location,
            ifsc_code,
            facebook,
            instagram,
            linkedin,
            youtube
        } = req.body

        const { profilePic, document_image, signature } = req.file
        const updateprofile = await doctorProfile.findOneAndUpdate({ doctorId: doctorId }, {
            "$set": {
                "profilePic": profilePic,
                "age": age,
                "dr_type": dr_type,
                "medical_reg_number": medical_reg_number,
                "state_medical_council": state_medical_council,
                "medical_reg_year": medical_reg_year,
                "degree": degree,
                "university_college_name": university_college_name,
                "year_degree_completion": year_degree_completion,
                "speciality_department": speciality_department,
                "specialization_type": specialization_type,
                "other_specializations": other_specializations,
                "experience": experience,
                "current_working": current_working,
                "current_location": current_location,
                "languages_spoken": languages_spoken,
                "kyc.document_image": document_type,
                "kyc.document_image": document_image,
                "bank_details.bank_name": bank_name,
                "bank_details.account_number": account_number,
                "bank_details.bank_location": bank_location,
                "bank_details.ifsc_code": ifsc_code,
                "signature": signature,
                "socialMedia_links.facebook": facebook,
                "socialMedia_links.instagram": instagram,
                "socialMedia_links.linkedin": linkedin,
                "socialMedia_links.youtube": youtube
            },
        })
        if (updateprofile) return res.status(200).send({ status: "success", message: "successfully updated profile" })
        return res.status(404).send({ status: "failed", message: "failed to update profile" })
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await doctorProfile.find()
        if (profiles.length == 0) return res.status(404).send({ status: "error", message: "no profiles found" })
        return res.status(200).send(profiles)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}

export { createProfile, updateProfile, getAllProfiles }