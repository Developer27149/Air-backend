// const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
globalThis.fetch = fetch;
globalThis.wallpapers = [];
globalThis.weatherCache = new Map();
globalThis.todos = new Map();

const express = require("express");
const expressJwt = require("express-jwt");
const router = require("./routes");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const port = 3000;

setInterval(() => {
  globalThis.wallpapers = [];
}, 1000 * 3600 * 1);

// jwt
app.use(
  expressJwt({
    secret: process.env.JWT,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login", "/msg", "/daily_wallpaper"],
  })
);
app.use(helmet()); // 常见漏洞保护
app.use(compression()); // compress all routes
app.use(express.json());
app.use(function (err, req, res, next) {
  if (
    err.name === "UnauthorizedError" ||
    req.headers.authorization !== process.env.COMMON_TOKEN
  ) {
    console.log(req.headers.authorization, process.env.COMMON_TOKEN);
    res.status(401).send({
      msg: "invalid token",
    });
  } else {
    console.log(
      "token euqal?",
      req.headers.authorization === process.env.COMMON_TOKEN
    );
    next();
  }
});
app.use(router);
app.use((req, res) => {
  res.status(404).send({
    msg: "404 NOT FOUND",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
