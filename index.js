const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Simple FREE reply generator (no external AI, no cost)
function generateReply(clinicName, rating, reviewText) {
  rating = parseInt(rating, 10);
  let reply = "";

  if (rating >= 4) {
    // Positive review
    reply = `Thank you for taking the time to share your feedback. We are pleased to know that your experience at ${clinicName} was positive. Your trust and support are sincerely appreciated. We look forward to welcoming you again.`;
  } else if (rating === 3) {
    // Neutral review
    reply = `Thank you for your feedback. We appreciate you sharing your experience at ${clinicName}. Your comments help us identify areas where we can improve our patient care and service.`;
  } else {
    // Negative review (1–2 stars)
    reply = `Thank you for bringing your experience to our attention. We are sorry to hear that your visit at ${clinicName} did not meet expectations. We take such feedback seriously and kindly request you contact the clinic directly so we can discuss your concerns in detail and assist you further.`;
  }

  return reply;
}

// API route to generate reply
app.post("/generate", (req, res) => {
  try {
    const { clinicName, rating, reviewText } = req.body;

    if (!clinicName || !rating || !reviewText) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const reply = generateReply(clinicName, rating, reviewText);
    res.json({ reply });
  } catch (error) {
    console.error("Error generating reply:", error);
    res.status(500).json({ error: "Failed to generate reply" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`ReviewDent AI (free version) running on port ${PORT}`);
});
