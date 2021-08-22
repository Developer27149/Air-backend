// const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const { getAllWallpaper, isAuth, getAMsg, getWeather } = require("./util");
const axios = require("axios");
globalThis.fetch = fetch;
globalThis.wallpapers = [];
globalThis.weatherCache = new Map();

const express = require("express");
const app = express();
const port = 3000;

setInterval(() => {
  globalThis.wallpapers = [];
}, 1000 * 3600 * 1);

app.get("/wallpapers", async (req, res) => {
  if (globalThis.wallpapers.length > 0) {
    res.send(globalThis.wallpapers);
  } else if (isAuth(req)) {
    const data = await getAllWallpaper();
    globalThis.wallpapers = data;
    res.send(data);
  } else {
    res.send({
      code: 404,
      message: "Bye",
    });
  }
});

app.get("/msg", (req, res) => {
  if (isAuth(req)) {
    res.send({
      data: getAMsg(),
    });
  } else {
    res.send({
      code: 404,
      message: "Bye",
    });
  }
});

app.get("/weather", async (req, res) => {
  if (isAuth(req)) {
    const location = req.query.location;
    const data = await getWeather(location);
    console.log(data);
    res.send(data);
  } else {
    res.send({
      code: 404,
      message: "Bye",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
