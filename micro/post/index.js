const express = require("express");
const { json } = require("body-parser");

const app = express();

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.post("/ping/post", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "post",
    reachedServer: timestamp
  });
});

app.listen(3000, () => {
  console.log("Listening on *:3000");
});
