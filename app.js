const express = require("express");
const tl = require("express-tl");
const path = require("path");
const app = express();
const sha1 = require("sha1");
const fs = require("fs");
const cookieParser = require("cookie-parser");

app.engine("tl", tl);
app.set("views", "./views");
app.set("view engine", "tl");
app.use(express.static("static"));
app.use(cookieParser());

app.get("/check/:stage", (req, res) => {
  let codeHash = req.query.code;
  let stage = req.params.stage;

  // TODO
  fs.readFile("./content/" + stage + ".json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("Not found");
      return; 
    }

    let solution = JSON.parse(data).solution;

    if (codeHash == solution) {
      res.cookie(stage, sha1(parseInt(stage)));
      res.send({success: true, msg: "success"}); //todo
    } else {
      res.send({success: false, msg: "nope"}); //todo
    }
  });
  
});

app.get("/", (req, res) => {
  let puzzleList = "";
  let count = 0;

  for(var c in req.cookies) {
    count++;
    try {
      const title = JSON.parse(fs.readFileSync("./content/" + c + ".json", {encoding: "utf8"})).title;
      puzzleList += 
        `<li>
          <div class="icon-text">
            <a href="${c}">${title}</a> 
            <span class="icon has-text-success">
              <i class="fas fa-check-square"></i>
            </span>
          </div>
        </li>`;
    } catch (err) {
      console.log(err);
    }

    if (req.cookies[c] != sha1(parseInt(c))) {
      puzzleList += "<li>CHEATED</li>";
    } 
  }
  try {
    const title = JSON.parse(fs.readFileSync("./content/" + (count+1) + ".json", {encoding: "utf8"})).title;
    puzzleList += 
        `<li>
          <div class="icon-text">
            <a href="${(count+1)}">${title}</a> 
            <span class="icon has-text-danger">
              <i class="fas fa-ban"></i>
            </span>
          </div>
        </li>`;
  } catch (err) {
    console.log(err);
  }

  res.render("index", {"puzzleList": puzzleList});
});

app.get("/:stage", (req, res) => {
  let stage = req.params.stage;  
  fs.readFile("./content/" + stage + ".json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("Not Found");
      return;
    }
   
    if (stage > 1) {
      if (!req.cookies) {
        res.send("No access");
        return;
      }

      for (var i = 1; i < stage; i++) {
        if (req.cookies[i] != sha1(i)) {
          res.send("No access");
          return;
        }
      }
    }

    res.render("stage", JSON.parse(data));
  });
});

const server = app.listen(2030);