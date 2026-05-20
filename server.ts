import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

dotenv.config();

// Fix 2: Contact Form Validation Schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().max(2000).optional().default("No message provided"),
  service: z.string().optional(),
});

// Fix 2: Rate Limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: { error: "Too many requests. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Email Route
  app.post("/api/contact", contactLimiter, async (req, res) => {
    // Fix 2: Zod Validation
    const result = contactSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid input fields", 
        details: result.error.format() 
      });
    }

    const { name, email, message, service } = result.data;

    // Fix 2: Sanitization
    const cleanName = DOMPurify.sanitize(name);
    const cleanMessage = DOMPurify.sanitize(message || "No message provided");
    const cleanService = service ? DOMPurify.sanitize(service) : "General";

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
        from: `"${cleanName}" <${userEmail}>`, // Using authenticated user email as 'from' for better deliverability
        to: 'thedotco.official@gmail.com',
        replyTo: email,
        subject: `Contact: ${cleanName} - ${cleanService}`,
        text: `New message from ${cleanName} (${email}):\n\n${cleanMessage}\n\nInterested in: ${cleanService}`,
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
