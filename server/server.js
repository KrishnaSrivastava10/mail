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

// ✅ Email API route
app.post("/sendMail", async (req, res) => {
  const { to, subject, body } = req.body;

  console.log("📩 Incoming request:", req.body);

  if (!to) {
    return res
      .status(400)
      .json({ success: false, error: "Recipient email is required" });
  }

  try {
    const info = await transporter.sendMail({
      from: "krishna.testtechdev@gmail.com",
      to,
      subject,
      text: body,
    });

    console.log("Email sent:", info.response);

    return res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ success: false, error: error.message || "Failed to send email" });
  }
});


app.use('/',routes)

Connection();
app.get("/", (req, res) => {
  res.send("✅ Backend running!");
});


// ✅ Run server on port 5001 (not 5000, avoids AirTunes conflict)
app.listen(5001, () => {
  console.log("Server running at http://localhost:5001");
});
