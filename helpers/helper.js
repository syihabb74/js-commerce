const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendMail(code) {
  // 1. Buat transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // bisa juga pakai host & port manual
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });

  const info = await transporter.sendMail({
    from: 'JS Commerce<syihabb74@gmail.com>', // sender
    to: 'clarenth6@gmail.com',                   // receiver
    subject: 'Test Email dari Nodemailer',
    text: `Your Verification Code is ${code}`,
    html: '<b>Halo</b>, ini email test dari Nodemailer pakai Gmail SMTP.'
  });

  console.log('✅ Email terkirim: %s', info.messageId);
}






