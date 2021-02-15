const express = require("express");
const { json } = require("body-parser");

const app = express();

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.put("/ping/put", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "put",
    reachedServer: timestamp
  });
});

app.listen(3000, () => {
  console.log("Listening on *:3000");
});
