import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminRouter } from "./Routes/AdminRoute.js";
import { StudentRouter } from "./Routes/StudentRoute.js";

import nodemailer from "nodemailer";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/student", StudentRouter);
app.use(express.static("Public"));

const router = express.Router();

app.use(
  "/mail",
  router.post("/", async (req, res) => {
    // Create a transporter object
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9dd2f427315366",
        pass: "4deea8acd5fc21",
      },
    });

    // Configure the mailoptions object
    const mailOptions = {
      from: "yourusername@email.com",
      to: "yourfriend@email.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  })
);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ Status: false, Error: "Internal Server Error" });
});

app.listen(3000, () => {
  console.log("Server is running");
});
