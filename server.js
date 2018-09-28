const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", `${log}\n`, e => {
    if (e) {
      console.log(e);
    }
  });
  next();
});
// app.use((req, res, next) => res.render("maintenance"));
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", t => t.toUpperCase());

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home page",
    welcomeMessage:
      "Welcome to a my first page with Node, Express & HBS view engine."
  });
});

app.get("/about", (req, res) => {
  //   res.send("About!");
  res.render("about", {
    title: "About page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "LePuff!!!" });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects page",
    projectMessage: "Porfolio here."
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
