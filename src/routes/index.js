const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getAllWallpaper, getAMsg, getWeather } = require("../util");

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
  console.log(req.user, "is token and user");
  res.send({
    data: getAMsg(),
  });
});

router.get("/test", (req, res) => {
  res.send({
    msg: "ok",
  });
});

router.get("/weather", async (req, res) => {
  const location = req.query.location;
  const data = await getWeather(location);
  console.log(data);
  res.send(data);
});

router.post("/login", (req, res) => {
  const { user } = req.body;
  if (!user) return res.statusCode(401);
  const token =
    "Bearer " +
    jwt.sign(
      {
        user: "aaron",
      },
      process.env.JWT,
      {
        expiresIn: 3600 * 24 * 7,
      }
    );
  res.json({
    status: "success",
    token,
  });
});

router.get("/todo", (req, res) => {
  // 从 token 中获取 user_id ，返回此用户数据
  res.send({
    data: [
      {
        isFinish: false,
        text: "coding...",
        date: new Date().toLocaleString(),
      },
    ],
  });
});

module.exports = router;
