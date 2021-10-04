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

async function getWallpaper(count, limit) {
  try {
    const data = await db.wallpaper.find({}).count(25);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function updateWithMany(data = []) {
  data.forEach(async (item) => {
    const result = await db.wallpaper.findOne({ id: item.id });
    if (!result) {
      db.wallpaper.insertOne(item);
    }
  });
}

module.exports = {
  insertOne,
  insertMany,
  dropWallpaper,
  getWallpaper,
  updateWithMany,
};
