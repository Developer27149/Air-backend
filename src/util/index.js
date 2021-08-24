const { createApi } = require("unsplash-js");

const Aaron = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: globalThis.fetch,
});

// const client = axios

async function getAllWallpaper() {
  try {
    const res = await Aaron.collections.getPhotos({
      collectionId: process.env.COLLECTION_ID,
      perPage: 365,
    });
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
  "更多的宽容给家人",
  "控制自己",
  "免费最贵",
  "学会拒绝",
  "也许你可以养一只狗子",
  "知易行难",
  "聊天不必辩论",
  "寻找自我价值",
  "等价交换是宇宙法则",
  "坚持原则",
  "常联系",
];
const getAMsg = () => {
  const randomNum = ~~(Math.random() * msgList.length);
  return msgList[randomNum];
};

const getWeather = async (location) => {
  const weather = globalThis.weatherCache.get(location);
  const time = new Date().getTime();
  if (weather && time - weather.time < 3 * 3600 * 1000) {
    console.log("get data from cache");
    return weather;
  } else {
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
      if (globalThis.weatherCache.size > 100) globalThis.weatherCache.clear();
      globalThis.weatherCache.set(location, result);
      return result;
    } catch (error) {
      console.log(error.message);
      return { msg: "error from util" };
    }
  }
};

module.exports = {
  getAllWallpaper,
  isAuth,
  getAMsg,
  getWeather,
};
