const express = require("express");
const { json } = require("body-parser");

const app = express();

app.set("trust proxy", true);
app.use(json({ limit: '100kb' }));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html")
})

app.listen(3000, () => {
  console.log("Listening on *:3000");
});
