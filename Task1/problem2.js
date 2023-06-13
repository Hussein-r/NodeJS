const fs = require("fs");
const moment = require("moment");
const data = JSON.parse(
  fs.readFileSync("problem2.json", { encoding: "utf-8" })
);
data.accidents.map(
  (item) => (item.date = moment(new Date(item.date)).format("YYYY-MM-DD"))
);
fs.writeFileSync("output2.json", JSON.stringify(data));
