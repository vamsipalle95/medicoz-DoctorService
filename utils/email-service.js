import nodemailer from 'nodemailer';



function sendMAIL(to, subject, html){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.USER_MAIL}`,
            pass: `${process.env.USER_PASS}`
        },
        tls: {
            rejectUnauthorized: false
        }
    
    })

    const mailOptions = {
        from: `${process.env.USER_MAIL}`,
        to: to,
        subject: `${subject}`,
        html: `${html}`
    }
    transporter.sendMail(mailOptions)
}


export { sendMAIL }