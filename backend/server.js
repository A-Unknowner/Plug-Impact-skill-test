const express = require("express");
const app = express();
const cors = require("cors");

// allow local request server
app.use(cors({ origin: "*" }));

app.use(express.json());

let campaigns = [];

// post request to create campaign
app.post("/api/campaigns", (req, res) => {
  const { title, goal, endDate} = req.body;
  const campaign = {
    id: campaigns.length + 1,
    title,
    goal,
    endDate: new Date(endDate),
    raised: 0,
  };
  campaigns.push(campaign);
  res.status(201).json(campaign);
});

// get response all active campaigns
app.get("/api/campaigns", (req, res) => {
   const now = new Date();
  const active = campaigns.filter(c => c.endDate > now);
  res.json(active);
});
 
app.listen(3000, () => console.log("Server running on port 3000"));
