const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.post("/ping/post/:bust", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "post",
    reachedServer: timestamp
  });
});

app.listen(3000, () => {
  console.log("Listening on *:3000");
});
