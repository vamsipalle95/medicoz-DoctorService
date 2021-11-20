import {  getAllProfiles, updateHospitalAdminProfile, } from "../../controllers/hospital/hospital-adminProfile.js";
import { authenticate } from "../../security/auth.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/hospitalAdmin')
        
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
       .route('/api/hospital-profile/update')
       .put(authenticate, upload.fields([
          { 
            name: 'picture',
            maxCount: 1 
          }
        ]),updateHospitalAdminProfile)
    
    app
       .route('/api/profiles')
       .get( getAllProfiles )
}

export default router;
