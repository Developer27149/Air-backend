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
  "熬夜伤神",
  "事和人都有两面",
  "说你所做的，做你所说的",
  "迟则生变",
  "或曾遗憾，不必后悔",
  "给家人更多宽容和耐心",
  "控制自己",
  "免费最贵",
  "拒绝亦无不可",
  "有时不必辩论",
  "机会像雨点般打来，而你却一一闪过",
  "保持原则",
  "常联系",
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

const getRandomImgUrl = async (option = {}) => {
  try {
    const { response, status } = await Aaron.photos.getRandom(option);
    const defaultRes = {
      full: "https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNTM2NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzMxNjc0NDA&ixlib=rb-1.2.1&q=85",
    };
    if (status === 200) {
      return response?.urls || defaultRes;
    } else {
      return defaultRes;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllWallpaper,
  isAuth,
  getAMsg,
  getWeather,
  initNet163Cookie,
  getRandomImgUrl,
};
