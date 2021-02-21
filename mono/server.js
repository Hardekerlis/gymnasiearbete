const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.get("/ping/:bust", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "get",
    reachedServer: timestamp
  });
});

app.post("/ping/:bust", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "post",
    reachedServer: timestamp
  });
});

app.put("/ping/:bust", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "put",
    reachedServer: timestamp
  });
});

app.delete("/ping/:bust", (req, res) => {
  const timestamp = + new Date();

  res.json({
    method: "delete",
    reachedServer: timestamp
  });
});




app.listen(3000, () => {
  console.log("Listening on *:3000");
});
