const http = require("http");
const express = require("express");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  //   res.sendFile("index.html");
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
