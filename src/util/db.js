const mongoist = require("mongoist");

const connectString = "mongodb://localhost:27017/air";
const db = mongoist(connectString);

async function insertOne(data) {
  try {
    await db.wallpaper.insertOne(data);
  } catch (error) {
    console.log(error);
  }
}

async function insertMany(data) {
  try {
    await db.wallpaper.insertMany(data);
  } catch (error) {
    console.log(error);
  }
}

async function dropWallpaper() {
  try {
    await db.wallpaper.drop();
  } catch (error) {
    console.log(error);
  }
}

async function getAllWallpaperData() {
  try {
    return db.wallpaper.find();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getWallpaperByFilter(
  skip = 0,
  limit = 10,
  filter = {
    updated_at: 1,
  }
) {
  try {
    const res = await db.wallpaper
      .findAsCursor()
      .skip(skip)
      .limit(limit)
      .sort(filter);
    return { data: await res.toArray(), hasNext: await res.hasNext() };
  } catch (error) {
    console.log(error);
    return { data: [], hasNext: false };
  }
}

async function getWallpaperByUnlessDislike(skip = 0, limit = 10, unlike = []) {
  try {
    const res = await db.wallpaper
      .findAsCursor({
        id: {
          $nin: unlike,
        },
      })
      .skip(skip)
      .limit(limit)
      .sort({
        updated_at: 1,
      });
    return {
      data: await res.toArray(),
      hasNext: await res.hasNext(),
    };
  } catch (error) {
    console.error(error);
    return { data: [], hasNext: false };
  }
}

async function updateWithMany(data = []) {
  try {
    data.forEach(async (item) => {
      const result = await db.wallpaper.findOne({ id: item.id });
      if (!result) {
        db.wallpaper.insertOne(item);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveDailySentence(data) {
  try {
    db.sentence.insertMany(data);
  } catch (error) {
    console.log(error);
  }
}

async function getWallpaperUnlessExist(existArr = []) {
  try {
    const data = await db.wallpaper.find({
      id: {
        $nin: existArr,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  insertOne,
  insertMany,
  dropWallpaper,
  getWallpaperByFilter,
  updateWithMany,
  getAllWallpaperData,
  saveDailySentence,
  getWallpaperByUnlessDislike,
  getWallpaperUnlessExist,
};
