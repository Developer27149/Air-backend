const { createApi } = require("unsplash-js");
const { login_cellphone } = require("NeteaseCloudMusicApi");

const Aaron = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: globalThis.fetch,
});

// const client = axios

async function getAllWallpaper() {
  try {
    const res = await Aaron.collections.getPhotos({
      collectionId: process.env.COLLECTION_ID,
      perPage: 40,
      // page: 1,
    });
    console.log(res.response.results.length);
    // console.log(res.response.results);
    return res.response.results.map((i) => {
      return {
        id: i.id,
        url: i.urls.full + "&w=1920",
        rawUrl: i.urls.raw,
        smImgUrl: i.urls.small,
        description: i.description,
        createAt: i.created_at,
      };
    });
  } catch (error) {
    return {
      status: "fail",
    };
  }
}

const isAuth = (url) => {
  return url?.query?.app === "air";
};

const msgList = [
  "照顾好自己",
  "潜龙勿用",
  "模棱两可让人不喜",
  "熬夜伤神",
  "事和人都有两面",
  "说你所做的，做你所说的",
  "迟则生变",
  "勿妄自菲薄，无用",
  "或曾遗憾，不必后悔",
  "给家人更多宽容和耐心",
  "控制自己",
  "免费最贵",
  "拒绝亦无不可",
  "也许你可以养一只狗子",
  "知易行难",
  "不必辩论",
  "机会像雨点打来，而你一一闪过",
  "等价交换是宇宙法则",
  "保持原则",
  "朋友常联系",
  "废话少说",
];
const getAMsg = () => {
  const randomNum = ~~(Math.random() * msgList.length);
  return msgList[randomNum];
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

module.exports = {
  getAllWallpaper,
  isAuth,
  getAMsg,
  getWeather,
  initNet163Cookie,
};
