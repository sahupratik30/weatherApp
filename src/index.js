const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/about/*", (req, res) => {
  res.render("404", {
    errMsg: "OOPS! Page Not Found.",
  });
});
app.get("/weather/*", (req, res) => {
  res.render("404", {
    errMsg: "OOPS! Page Not Found.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errMsg: "OOPS! Page Not Found.",
  });
});
app.listen(8000, () => {
  console.log("Listening to port number 8000.");
});
