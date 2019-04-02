const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('../public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/entries', {
  useNewUrlParser: true
});

const entries = require("./entries.js");
app.use("/api/entries", entries);

app.listen(3002, () => console.log('Server listening on port 3002!'));
