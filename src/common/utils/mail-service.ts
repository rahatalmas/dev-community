import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "who.merahat11@gmail.com",
    pass: "",
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent:", info.messageId);
})();