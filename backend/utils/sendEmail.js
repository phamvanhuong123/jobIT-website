const nodemailer = require("nodemailer");
module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "dophamhyc@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  var options = {
    from: "dophamhyc@gmail.com",
    to: "dolataoday123@gmail.com",
    subject: "Hello ✔", //tiêu đè
    text: "Hello world", // plain‑text body
    html: "<b>Xin chào?</b>", // HTML body
  };
  transporter.sendMail(options,(error) => {
    if (error) {
          console.log(error);
        } else {
          console.log("Gửi email thành công");
        }
  })

};
