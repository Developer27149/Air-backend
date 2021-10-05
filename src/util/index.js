const { login_cellphone } = require("NeteaseCloudMusicApi");
const { getAllPhoto } = require("./unsplash.js");
const { insertMany, updateWithMany, saveDailySentence } = require("./db.js");

// const client = axios

async function getAllWallpaper() {
  try {
    // return res.response.results.map((i) => {
    //   return {
    //     id: i.id,
    //     url: i.urls.full + "&w=1920",
    //     rawUrl: i.urls.raw,
    //     smImgUrl: i.urls.small,
    //     description: i.description,
    //     createAt: i.created_at,
    //     data: i,
    //   };
    // });
  } catch (error) {
    return {
      status: "fail",
    };
  }
}

const updateAllWallpaperFromUnsplash = async () => {
  /**
   * 1. get data
   * 2. save to db
   */
  const data = await getAllPhoto();
  await updateWithMany(data);
};

const isAuth = (url) => {
  return url?.query?.app === "air";
};

const getWeather = async (location) => {
  try {
    const url = `https://devapi.qweather.com/v7/weather/now?key=${process.env.HEFENG_KEY}&location=${location}`;
    const data = await globalThis.fetch(url, { timeout: 6000 });
    const jsonData = await data.json();
    const result = {
      time: new Date().getTime(),
      temp: jsonData.now.temp,
      msg: "success",
      text: jsonData.now.text,
    };
    return result;
  } catch (error) {
    console.log(error.message);
    return { msg: "error from util" };
  }
};

const initNet163Cookie = async (req, res, next = () => {}) => {
  try {
    // const result = await login_cellphone({
    //   phone: process.env.PHONE,
    //   password: process.env.NET163_PW,
    // });
    // globalThis.cookie = result.body.cookie;
    globalThis.cookie = process.env.COOKIE;
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
};

const getRandomImgUrl = async (option = {}) => {
  try {
    // const { response, status } = await unsplashApi.photos.getRandom(option);
    // const defaultRes = {
    //   full: "https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNTM2NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzMxNjc0NDA&ixlib=rb-1.2.1&q=85",
    // };
    // if (status === 200) {
    //   return response?.urls || defaultRes;
    // } else {
    //   return defaultRes;
    // }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllWallpaper,
  isAuth,
  getWeather,
  initNet163Cookie,
  getRandomImgUrl,
  updateAllWallpaperFromUnsplash,
};
