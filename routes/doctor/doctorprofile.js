import { createProfile, getAllProfiles, updateProfile } from "../../controllers/doctor/doctorProfile.js";
import { authenticate } from "../../security/auth.js";
import multer from 'multer';
import {joi} from "../../validations/joiValidator.js"
import { doctorValidation } from "../../validations/doctor.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
        
        // else if(file.filename === "kyc"){
        //     cb(null, './uploads/kyc')
        // }
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({ storage: storage })

const router = (app) => {
    app
       .route('/api/profile')
       .post( joi(doctorValidation.createDoctorProfileValidation, 'body'), authenticate, upload.fields([
            { 
                name: 'certificate',
                maxCount: 1 
            }, 
            { 
                name: 'kyc',
                maxCount: 1 
            }
      ]), createProfile)

    app
       .route('/api/update-profile')
       .put( joi(doctorValidation.updateDoctorValidation, 'body'), authenticate, updateProfile)
    
    app
       .route('/api/profiles')
       .get( getAllProfiles )
}

export default router;
