const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASS } = process.env;

async function sendEmail({ to, subject, html }) {
  const email = {
    from: "info@bookingclub.com",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
}

module.exports = sendEmail;

// const { EMAIL_USER, EMAIL_PASS } = process.env;

// async function sendEmail({ to, subject, html }) {
//   try {
//     const email = {
//       from: "froomdimasssnike@ukr.net",
//       to,
//       subject: "Sending with Nodemailer is Fun",
//       text: "and easy to do anywhere",
//       html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm your email</a>`,
//       // html: "<p><strong>Test email</strong> from localhost:3001</p><a href='https://www.example.com'>Click here</a>",
//       // html: "<a><strong>Test email</strong> from localhost:3001 Click here</a>",
//     };

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//       },
//     });

//     const responce = await transport.sendMail(email);
//     console.log(responce);
//   } catch (error) {
//     console.error("Aplication error");
//   }
// }

// module.exports = sendEmail;
