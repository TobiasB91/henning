const express = require("express");
const path = require("path");
const app = express();
const sha1 = require("sha1");

app.use(express.static("static"));

app.get("/enter", (req, res) => {
  var codeHash = req.query.code;
  if (codeHash == "abc") {
    res.send("success");
  } else {
    res.send("nope");
  }
});

app.get("/", (req, res) => {
  res.sendFile("html/index.html", { root: path.join(__dirname) });
});

const server = app.listen(2030);