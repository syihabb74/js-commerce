const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");

async function sendMail(verificationCode, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  });

  console.log('Email Sending......')

}


const hash = (code) => {

    const salt = bcryptjs.genSaltSync(10);
    if (typeof code === 'number') {
        code += ''
            const hash = bcryptjs.hashSync(code, salt);
            return hash
    } 
    
    const hash = bcryptjs.hashSync(code, salt);
    return hash

    

}


module.exports = {hash, sendMail};








