import { verifyDoctor } from "../../controllers/admin/adminaccess.js";

const router = (app) => {
   app
      .route('/api/verify/:profileId')
      .post(verifyDoctor)
}

export default router;