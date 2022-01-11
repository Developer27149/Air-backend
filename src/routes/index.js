const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAMsg,
  getWeather,
  getRandomImgUrl,
  updateAllWallpaperFromUnsplash,
} = require("../util");
const { user_cloud, song_url } = require("NeteaseCloudMusicApi");
const { getAllWallpaperData } = require("../util/db.js");
const {
  wallpaperPage,
  wallpaperPageUnlessDislike,
  getNewestWallpaperAtClient,
  getWallpaperComment,
} = require("./wallpaper.js");

router.get("/wallpaper/all", async (req, res) => {
  const data = await getAllWallpaperData();
  res.send(data);
});

router.get("/update/wallpapers", async (req, res) => {
  try {
    await updateAllWallpaperFromUnsplash();
    res.send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/wallpaper/page/:num", wallpaperPage);
router.post("/wallpaper/page/:num", wallpaperPageUnlessDislike);
router.post("/wallpaper/newest", getNewestWallpaperAtClient);

router.get("/msg", (req, res) => {
  res.send({
    data: getAMsg(),
  });
});

router.get("/weather", async (req, res) => {
  const location = req.query.location;
  const data = await getWeather(location);
  res.send(data);
});

router.get("/wallpaper/random", async (req, res) => {
  const data = await getRandomImgUrl({
    collections: "hkToSCaeZUE",
  });
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

router.get("/songs", async (req, res) => {
  try {
    const { body } = await user_cloud({
      cookie: globalThis.cookie,
    });
    const songsData = body.data;
    const songDetail = await Promise.all(
      songsData.map((i) =>
        song_url({
          id: `${i.songId}`,
          cookie: globalThis.cookie,
        })
      )
    );
    const result = songDetail.map((i, idx) => {
      return {
        songName: songsData[idx].songName,
        picUrl: songsData[idx].simpleSong.al.picUrl,
        url: i.body.data[0].url,
        id: songsData[idx].songId,
        artist: songsData[idx].artist,
      };
    });
    res.send({ result });
  } catch (error) {
    res.send({
      msg: "error - get songs fail.",
    });
  }
});

module.exports = router;
