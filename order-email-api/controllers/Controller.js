import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message, adress, product } = req.body;

  if (!name || !email || !phone || !message || !adress || !product) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const productFeatures = product.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    const mailOptions = {
      from: email,
      to: process.env.TO_EMAIL,
      subject: "🛍️ New Product Order",
      html: `
        <h2>🛒 New Product Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${adress}</p>
        <p><strong>Message:</strong> ${message}</p>
        <hr />
        <h3>📦 Product Details</h3>
        <p><strong>Title:</strong> ${product.title}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Sizes:</strong> ${product.sizes.join(", ")}</p>
        <img src="${product.image}" alt="${product.title}" width="200" style="margin-top: 10px;" />
        <ul>${productFeatures}</ul>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
