const {
  getWallpaperByFilter,
  getWallpaperByUnlessDislike,
} = require("../util/db.js");

/**
 * 按页面获取壁纸，提供分页功能
 * @param  {} req
 * @param  {} res
 */
const wallpaperPage = async (req, res) => {
  try {
    const pageNum = parseInt(req.params.num) - 1;
    const { data, hasNext } = await getWallpaperByFilter(10 * pageNum, 18);
    res.send({
      ok: true,
      data,
      hasNext,
    });
  } catch (error) {
    console.error(error);
    res.send({
      ok: false,
      data: [],
    });
  }
};

const wallpaperPageUnlessDislike = async (req, res) => {
  try {
    const pageNum = parseInt(req.params.num) - 1;
    const unlikeArr = req.body?.unlike ?? ["uWFFw7leQNI"];
    const data = await getWallpaperByUnlessDislike(10 * pageNum, 1, unlikeArr);
    console.log(data);
    res.send({});
  } catch (error) {
    console.error(error);
  }
};

module.exports = { wallpaperPage, wallpaperPageUnlessDislike };
