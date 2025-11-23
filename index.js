const express = require("express");
const app = express();
app.use(express.json());

// REQUIRED FOR META VALIDATION
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "pranavtoken";

  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// HANDLE INCOMING MESSAGES
app.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// PORT REQUIRED BY RENDER
app.listen(3000, () => {
  console.log("Server running!");
});
