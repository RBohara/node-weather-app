const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rahul Bohara",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Rahul Bohara",
    title: "About Me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "You can get help with the application in this page.",
    title: "Help",
    name: "Rahul Bohara",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide a location",
    });
  }
  forecast(req.query.location, (error, data = undefined) => {
    if (error) {
      return res.send({ error: "Please provide a valid location." });
    }
    res.send({
      location: req.query.location,
      temp: data.temp,
      precip: data.precip,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "The help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "The Page does not exist",
    name: "Rahul Bohara",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
