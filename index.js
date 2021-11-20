import express from 'express';
const app = express();
import { createRequire } from 'module';
import mongoose from 'mongoose';
const require = createRequire(import.meta.url);
require('dotenv').config()

const port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: false }));
app.use(express.static('public'));

import doctorAuth from "./routes/doctor/doctorAuth.js"
import doctorProfile from "./routes/doctor/doctorProfile.js"
import adminAccess from "./routes/admin/adminaccess.js"
import hospitalAdmin from "./routes/hospital/hospital-adminAuth.js";
import hospitalAdminProfile from "./routes/hospital/hospital-adminProfile.js";

console.log(process.env.MongoURI)

mongoose.connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log('db connected') }).catch((err) => { console.log(err) })

app.get('/', (req, res) => {
    res.send('hello')
})

doctorAuth(app)
doctorProfile(app)
adminAccess(app)
hospitalAdmin(app)
hospitalAdminProfile(app)

export default app.listen(port, () => {
    console.log(`server is running on ${port}`)
})