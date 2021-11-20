import HospitalAdmin from '../../models/hospital/hospital-adminAuth.js';

const updateHospitalAdminProfile = async (req, res) => {
    try {
        const { hospital_adminId } = req.user
        let isProfile = await HospitalAdmin.findOne({ doctorId: hospital_adminId }).select("isverified email_verify")
        if (isProfile == null) return res.status(404).send({ status: 'failed', message: "No profile found" })
        const { isverified, email_verify } = isProfile
        if (!isverified && email_verify) return res.status(403).send({ status: "error", message: "please wait till your profile is verified" })
        const {
             gender, age, mobilePhone2, from_time, to_time, department_name, department_phone, about_me, achievements_awards, facebook, instagram, linkedin, youtube
        } = req.body

        const { picture } = req.files
        const picturePath  = (picture != undefined ? req.files.picture[0].path : '' )
        const updateprofile = await HospitalAdmin.findOneAndUpdate({ doctorId: hospital_adminId }, {
            "$set": {
                "hospital_pic":picturePath,
                "gender":gender,
                "age":age,
                "mobilePhone2":mobilePhone2,
                "about_me":about_me,
                "socialMedia_links.facebook": facebook,
                "socialMedia_links.instagram": instagram,
                "socialMedia_links.linkedin": linkedin,
                "socialMedia_links.youtube": youtube
            },
            "$push":{
                "opd_timings.from": from_time,
                "opd_timings.to":to_time,
                "department.name":department_name,
                "department.phone": department_phone,
                "achievements_awards":achievements_awards,
            }
        })
        if (updateprofile) return res.status(200).send({ status: "success", message: "successfully updated profile" })
        return res.status(404).send({ status: "failed", message: "failed to update profile" })
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await HospitalAdmin.find()
        if (profiles.length == 0) return res.status(404).send({ status: "error", message: "no profiles found" })
        return res.status(200).send(profiles)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}




export { updateHospitalAdminProfile, getAllProfiles }