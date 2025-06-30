const nodemailer = require("nodemailer");
module.exports = (email,subject,html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "dophamhyc@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
    tls : {
      rejectUnauthorized: false
    }
  });

  var options = {
    from: "dophamhyc@gmail.com",
    to: email,
    subject: subject, //tiêu đè
    text: "Hello world", // plain‑text body
    html: html
  };
  transporter.sendMail(options,(error) => {
    if (error) {
          console.log(error);
        } else {
          console.log("Gửi email thành công");
        }
  })

};
