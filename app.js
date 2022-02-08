const TELEGRAM_TOKEN = "5253701676:AAG4WqkZHp4deWHeivBDiSVbCxRPjP49Ym8";
const CAT_API_KEY = "d6f22261-825e-47c9-9514-c05ff7e289d2";

const express = require("express");
const tl = require("express-tl");
const path = require("path");
const app = express();
const sha1 = require("sha1");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const https = require("https");
const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_TOKEN);
const FormData = require("form-data");
const { application } = require("express");

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



const BOT_TEXT_PHRASES = [
  "Es gibt einen Weg mich zu überzeugen, Dir das Lösungswort zu verraten. Leicht einzuschüchtern bin ich aber nicht! 💪🐭",
  "🐭🐭🐭🐭🐭",
  "Ich mag Käse.",
  "Piep Piep 🐭", 
  "Leicht einzuschüchtern bin ich nicht! 💪🐭"
];

bot.on(["text", "audio", "voice"], msg => {
  let j = Math.floor(Math.random() * BOT_TEXT_PHRASES.length);
  return msg.reply.text(BOT_TEXT_PHRASES[j]);
});

bot.on("photo", msg => {
  bot.getFile(msg.photo[msg.photo.length-1].file_id).then(file => {
    var stream = fs.createWriteStream(file.file_path);
    https.get(`https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${file.file_path}`, res => {
      res.pipe(stream);
      stream.on("finish", () => {
        stream.close(() => {
          let options = {
            host: "api.thecatapi.com", 
            protocol: "https:",
            path: "/v1/images/upload", 
            headers: { 
              "content-type": "multipart/form-data;", 
              "x-api-key": CAT_API_KEY
            }
          };

          let form = new FormData();
          form.append("file", fs.createReadStream(file.file_path));
          form.append("sub_id", "");
          let req2 = form.submit(options, (err, res2) => {
            if (err) {
              console.log(err);
              return;
            }

            let chunks = [];

            res2.on("data", c => {
              console.log(c);
              chunks.push(c);
            });

            res2.on("end", () => {
              if (!res2.complete) {
                console.log("ERR");
              }
              console.log(Buffer.concat(chunks).toString());
              console.log("end");
            });
            
          }); 

        });
      });
    }).on("error", err => {
      console.log(err);
    });
  }).catch(err => {
    console.log(err);
  });
});

bot.start();

const server = app.listen(2030);