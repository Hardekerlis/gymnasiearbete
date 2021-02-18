const express = require("express");
const { json } = require("body-parser");

const app = express();

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.get("/ping", (req, res) => {
  const timestamp = + new Date();

  res.json({
    reachedServer: timestamp
  });
});

app.post("/ping", (req, res) => {
  const timestamp = + new Date();

  res.json({
    reachedServer: timestamp
  });
});

app.put("/ping", (req, res) => {
  const timestamp = + new Date();

  res.json({
    reachedServer: timestamp
  });
});

app.delete("/ping", (req, res) => {
  const timestamp = + new Date();

  res.json({
    reachedServer: timestamp
  });
});




app.listen(3000, () => {
  console.log("Listening on *:3000");
});
