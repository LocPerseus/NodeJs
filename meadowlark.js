const express = require("express");

const app = express();

// way 1
// const handlebars = require('express-handlebars');

// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');

// way 2 set up handlebars view engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server started on http://localhost:" + app.get("port"));
});

var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];

// static file
app.use(express.static(__dirname + "/public"));

// routing
app.get("/", function(req, res) {
  // res.type('text/plain');
  // res.send('MeadowLark Travel');
  res.render("home");
});

app.get("/about", function(req, res) {
  // res.type('text/plain');
  // res.send('About MeadowLark Travel');
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

// custom 404
app.use(function(req, res, next) {
  // res.type('text/plain');
  res.status(404);
  // res.send('404 - Not Found');
  res.render("404");
});
// custom 500
app.use(function(err, req, res, next) {
  console.error(err.stack);
  // res.type('text/plain');
  res.status(500);
  // res.send('500 - Server Error')
  res.render("505");
});
