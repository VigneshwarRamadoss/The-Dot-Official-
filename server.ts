import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Email Route
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, service } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userEmail = process.env.EMAIL_USER || 'thedotco.official@gmail.com';
    const userPass = process.env.EMAIL_PASS;

    // If no password is provided, we run in mock mode to prevent crashes
    if (!userPass) {
      console.warn("EMAIL_PASS not found. See .env.example to set up your Google App Password.");
      return res.json({ 
        success: true, 
        message: "Action Required: Set EMAIL_PASS in the Settings panel to enable live emails.",
        mock: true 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: userEmail,
          pass: userPass
        }
      });

      const mailOptions = {
        from: `"${name}" <${userEmail}>`, // Using authenticated user email as 'from' for better deliverability
        to: 'thedotco.official@gmail.com',
        replyTo: email,
        subject: `Contact: ${name} - ${service || 'General'}`,
        text: `New message from ${name} (${email}):\n\n${message}\n\nInterested in: ${service || 'Not specified'}`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error: any) {
      console.error("SMTP Error:", error.message);
      
      let errorMessage = "Failed to send email. Please try again later.";
      if (error.message.includes('535')) {
        errorMessage = "Authentication failed. Check if EMAIL_PASS is a valid 'App Password'.";
      }

      res.status(500).json({ 
        error: errorMessage,
        code: error.code 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
