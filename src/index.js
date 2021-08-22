// const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
globalThis.fetch = fetch;
globalThis.wallpapers = [];
globalThis.weatherCache = new Map();
const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;

setInterval(() => {
  globalThis.wallpapers = [];
}, 1000 * 3600 * 1);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
