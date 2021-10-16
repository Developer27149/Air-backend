const { getCommentById, db } = require("../util/db.js");

const getWallpaperComment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getCommentById(id);
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

const setWallpaperComment = async (req, res) => {
  try {
    const { id, data } = req.body;
    const result = await db.comment.insertOne({ id, data });
    console.log(result);
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
    });
  }
};

module.exports = {
  getWallpaperComment,
  setWallpaperComment,
};
