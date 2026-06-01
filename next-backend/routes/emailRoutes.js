const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-email", async (req, res) => {
  const { name, company, email, phone,  requirement } = req.body;
  try {
    const response = await resend.emails.send({
      from: "no-reply@printkee.com",
      to: "sales@printkee.com",
      reply_to: email,
      subject: "New Enquiry from Printkee",
      text: `
        Hi Team,

        You have received a new inquiry through Printkee.com. Please find the details below:

        Name: ${name}
        Company: ${company}
        Email: ${email}
        Phone: ${phone}
        Message: ${requirement}

        Please reach out to the user as soon as possible.

        Best regards,
        Printkee
      `,
    });
    res.status(200).json({ success: true, message: "Email sent successfully!", response });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

module.exports = router;
