import { signup, login, emailVerification, forgotPasswordEmail, resetPassword } from "../../controllers/hospital/hospital-adminAuth.js"
import multer from 'multer'
import { authenticate } from "../../security/auth.js"
import {joi} from "../../validations/joiValidator.js"
import { hospitalAdminValidation } from "../../validations/hospitalAdmin.js"

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
      .route('/api/hospital-admin/signup')
      .post(joi(hospitalAdminValidation.signupValidation, 'body'), upload.fields(
         [
            { 
               name: 'hospitalCertificate',
               maxCount: 1 
            }
         ]
      ),signup)

   app
      .route('/api/hospital-admin/login')
      .post( joi(hospitalAdminValidation.loginValidation, 'body'), login)

   app
      .route('/api/hospital-admin/verify-email')
      .get(emailVerification)

   app
      .route('/api/hospital-admin/forgot-password')
      .get(forgotPasswordEmail)

   app
      .route('/api/hospital-admin/reset-password/:id')
      .put(resetPassword)
}

export default router;