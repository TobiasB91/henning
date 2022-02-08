const TELEGRAM_TOKEN = "";

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
  "Leicht einzuschüchtern bin ich nicht! 💪🐭",
  "Ich bin eine Maus. Hihi.",
  "Ich hab' Hunger..."
];


const some = (str, substrings) => {
  for(i in substrings) {
    if (str.includes(substrings[i])) {
      return true;
    }
  }
  return false;
};

bot.on(["text"], msg => {
  let cheeseCount = Array.from(msg.text).filter(c => c == String.fromCodePoint(129472)).length;
  let catCount = Array.from(msg.text).filter(c => some(c, ([128049, 128008, 128570, 128571, 128572, 128573, 128574, 128575, 128576 ].map(x => String.fromCodePoint(x))))).length;

  if (catCount > 2) {
    return msg.reply.text("AHHHH!! Ok, ok, ich sag Dir das Lösungswort, aber lass mir bloß Deine Katze vom Hals! \nDas Lösungswort lautet: \"Käse\".");
  }

  if (catCount > 0) {
    return msg.reply.text("Ah! Geh weck mit Deinen Katzen! " + String.fromCodePoint(129327));
  }

  if (cheeseCount > 4) {
    return msg.reply.text("Danke! Das ist erst einmal genug für den Winterschlaf *mampf*. Das Lösungswort lautet übrigens: \"Käse\".");
  }

  if (cheeseCount > 1) {
    return msg.reply.text("Lecker, mehr!");
  }

  if (cheeseCount > 0) {
    return msg.reply.text("Mhhhh, lecker! Hast Du mehr davon?");
  }

  let j = Math.floor(Math.random() * BOT_TEXT_PHRASES.length);
  return msg.reply.text(BOT_TEXT_PHRASES[j]);
});

bot.on(["audio, voice"], msg => {
  return msg.reply.text("Liebliche Stimme! 🐭");
});

bot.on(["photo", "sticker"], msg => {
  return msg.reply.text("Hübsch.");
});

bot.start();

const server = app.listen(2030);