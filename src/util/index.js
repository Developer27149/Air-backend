const { createApi } = require("unsplash-js");

const Aaron = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: globalThis.fetch,
});

async function getAllWallpaper() {
  try {
    const res = await Aaron.collections.getPhotos({
      collectionId: process.env.COLLECTION_ID,
      perPage: 365,
    });
    console.log(res.response.results);
    return res.response.results.map((i) => {
      return {
        id: i.id,
        url: i.urls.full,
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

const isAuth = (req) => {
  return req?.query?.name === "aaron";
};

module.exports = {
  getAllWallpaper,
  isAuth,
};
