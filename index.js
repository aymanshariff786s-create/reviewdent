const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors()); // ✅ ALLOW NETLIFY TO CALL RENDER
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ---------- AI REPLY LOGIC (FREE, NO API) ---------- */
function generateReply(clinicName, rating, reviewText) {
  if (rating >= 4) {
    return `Thank you for taking the time to share your feedback. We are pleased to know that your experience at ${clinicName} was positive. Your trust and support are sincerely appreciated. We look forward to welcoming you again.`;
  }

  if (rating === 3) {
    return `Thank you for your feedback. We appreciate you sharing your experience at ${clinicName}. Your comments help us identify areas where we can improve our patient care and service.`;
  }

  return `Thank you for bringing your experience to our attention. We are sorry to hear that your visit at ${clinicName} did not meet expectations. We take such feedback seriously and kindly request you contact the clinic directly so we can discuss your concerns in detail and assist you further.`;
}

/* ---------- API ---------- */
app.post("/generate", (req, res) => {
  const { clinicName, rating, reviewText } = req.body;

  if (!clinicName || !rating || !reviewText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const reply = generateReply(clinicName, Number(rating), reviewText);
  res.json({ reply });
});

/* ---------- PORT (RENDER REQUIRED) ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ReviewDent AI backend running on port ${PORT}`);
});
