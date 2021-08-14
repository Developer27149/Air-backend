// const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const { getAllWallpaper, isAuth } = require("./util");

globalThis.fetch = fetch;

const express = require("express");
const app = express();
const port = 3000;

app.get("/wallpapers", async (req, res) => {
  if (isAuth(req)) {
    const data = await getAllWallpaper();
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
