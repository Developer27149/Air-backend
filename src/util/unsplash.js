const { default: axios } = require("axios");

const baseUrl = "https://api.unsplash.com";
const KEY = process.env.UNSPLASH_ACCESS_KEY;

module.exports = {
  // 从 岚 获取所有图片数据
  getAllPhoto: async () => {
    try {
      const collectionInfo = await axios.get(
        `${baseUrl}/collections/hkToSCaeZUE/?client_id=${KEY}`
      );
      const requestCount = Math.ceil(collectionInfo.data["total_photos"] / 30);
      const promiseArr = [...Array(requestCount)].map((_, idx) => {
        return axios.get(
          `${baseUrl}/collections/hkToSCaeZUE/photos?client_id=${KEY}&per_page=30&page=${
            idx + 1
          }`
        );
      });
      const dataArr = await Promise.allSettled(promiseArr);
      return dataArr
        .filter((i) => i.status === "fulfilled")
        .map((i) => i.value.data)
        .flat();
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
