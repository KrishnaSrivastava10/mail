import express, { urlencoded } from "express";
import Connection from "./database/db.js";
import nodemailer from "nodemailer";
import cors from "cors";
import routes from "./routes/route.js";

const app = express();



// ✅ Allow React frontend on port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}));

// ✅ Configure Nodemailer transporter (use App Password, not Gmail password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krishna.testtechdev@gmail.com",
    pass: "cxeh radc fvxn ywid", // Gmail App Password
  },
});

// Verify transporter at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter config error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

import Email from "./model/email.js";


app.post("/sendMail", async (req, res) => {
  const { to, subject, body } = req.body;

  console.log("📩 Incoming request:", req.body);

  if (!to) {
    return res.status(400).json({ success: false, error: "Recipient email is required" });
  }

  try {
    // Send email
    const info = await transporter.sendMail({
      from: "krishna.testtechdev@gmail.com",
      to,
      subject,
      text: body,
    });

    console.log("Email sent:", info.response);

    // ✅ Save to MongoDB with body
    const email = new Email({
      to,
      from: "krishna.testtechdev@gmail.com",
      subject,
      body,                // <-- include body
      date: new Date(),
      name: "Krishna",     // could also come from logged-in user
      starred: false,
      bin: false,
      type: "sent",
    });

    await email.save();
    console.log("Email saved to MongoDB");

    return res.json({ success: true, message: "Email sent & saved successfully!" });
  } catch (error) {
    console.error("Error sending/saving email:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});



app.use('/',routes)

Connection();
app.get("/", (req, res) => {
  res.send("Backend running!");
});


app.listen(5001, () => {
  console.log("Server running at http://localhost:5001");
});
