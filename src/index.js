// const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const { getAllWallpaper, isAuth } = require("./util");

globalThis.fetch = fetch;
globalThis.wallpapers = [];

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
