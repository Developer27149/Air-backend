// const express = require("express");
require("dotenv").config();
const express = require("express");
const expressJwt = require("express-jwt");
const router = require("./routes");
const compression = require("compression");
const helmet = require("helmet");
const { initNet163Cookie } = require("./util/index.js");
const app = express();

// 初始化网易云 cookie
app.use(initNet163Cookie);
// jwt
app.use(
  expressJwt({
    secret: process.env.JWT,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/login",
      "/msg",
      "/weather",
      {
        url: /wallpaper\/page\/\d+/,
        methods: ["POST", "GET"],
      },
      "/songs",
      "/wallpaper/random",
      "/update/wallpapers",
      {
        url: "/wallpaper/newest",
        methods: ["POST"],
      },
    ],
  })
);
app.use(helmet()); // 常见漏洞保护
app.use(compression()); // compress all routes
app.use(express.json()); // keep json data
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      msg: "invalid token",
    });
  } else {
    next();
  }
});
app.use(router);
app.use((req, res) => {
  res.status(404).send({
    msg: "404 NOT FOUND",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
