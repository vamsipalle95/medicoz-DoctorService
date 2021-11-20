import { signup, login, emailVerification, forgotPasswordEmail, resetPassword } from "../../controllers/doctor/doctorAuth.js"
import { authenticate } from "../../security/auth.js"
import {joi} from "../../validations/joiValidator.js"
import { doctorValidation } from "../../validations/doctor.js"

const router = (app) => {
   app
      .route('/api/signup')
      .post( joi(doctorValidation.signupValidation,  'body'), signup)

   app
      .route('/api/login')
      .post( joi(doctorValidation.loginValidation, 'body') ,login)

   app
      .route('/api/verify-email')
      .get(emailVerification)

   app
      .route('/api/forgot-password')
      .get(forgotPasswordEmail)

   app
      .route('/api/reset-password/:id')
      .put(resetPassword)
}

export default router;