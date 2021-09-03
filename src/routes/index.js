const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { default: fetch } = require("node-fetch");
const { getAllWallpaper, getAMsg, getWeather } = require("../util");

router.get("/wallpapers", async (req, res) => {
  const data = await getAllWallpaper();
  res.send(data);
});

router.get("/msg", (req, res) => {
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

router.get("/daily_wallpaper", async (req, res) => {
  res.send({
    url: "https://www.bing.com/az/hprichbg/rb/NarrowsZion_ZH-CN9686302838_1920x1080.jpg",
  });
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
