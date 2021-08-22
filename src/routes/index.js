const express = require("express");
const router = express.Router();
const { getAllWallpaper, isAuth, getAMsg, getWeather } = require("../util");

router.use((req, res, next) => {
  if (isAuth(req)) {
    next();
  } else {
    res.send({
      test: "Sorry man.",
    });
  }
});

router.get("/wallpapers", async (req, res) => {
  if (globalThis.wallpapers.length > 0) {
    res.send(globalThis.wallpapers);
  } else {
    const data = await getAllWallpaper();
    globalThis.wallpapers = data;
    res.send(data);
  }
});

router.get("/msg", (req, res) => {
  res.send({
    data: getAMsg(),
  });
});

router.get("/weather", async (req, res) => {
  const location = req.query.location;
  const data = await getWeather(location);
  console.log(data);
  res.send(data);
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send({
    msg: "login msg",
  });
});

module.exports = router;
