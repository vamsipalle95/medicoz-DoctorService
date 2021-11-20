import doctorProfile from '../../models/doctor/doctorProfile.js';
import generateUniqueId from 'generate-unique-id';
import {ObjectId} from 'mongodb'

function doctorUniqueId() {
    const id = generateUniqueId({
        length: 7,
        useLetters: false,
    })
    return ('DR' + id)
}

const verifyDoctor = async (req,res)=>{
    try{
        const { profileId } = req.params
        const findDoctor = await doctorProfile.findOne({ doctorId : ObjectId(profileId) })
        if(!findDoctor) return res.status(404).send({status:"error",message:"no profile found"})
        const uniqueId = await doctorUniqueId()
        const verify = await doctorProfile.findOneAndUpdate({ doctorId : ObjectId(profileId)},{"$set":{ "verified":true, "doctor_uniqueId": uniqueId}}) 
        if(verify) return res.status(200).send({status:"success",message:"successfully updated verified"})
        return res.status(400).send({status:"error",message:"failed to update verified"})
    }catch(err){
        res.status(500).send({status:"error",message:err.message})
    }
}

export { verifyDoctor }