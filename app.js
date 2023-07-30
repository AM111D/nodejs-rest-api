const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST } = process.env;

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRouter);
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// ----------------------------------------------------------------
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

// ------------------------------------------------------------------------

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   auth: {
//     user: "dimasssnike@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "ninek17677@quipas.com",
//   from: "dimasssnike@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3001</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

module.exports = app;
