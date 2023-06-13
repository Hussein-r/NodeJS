const fs = require("fs/promises");
const spreadArrOfArr = function (arr) {
  let res = [];
  for (i of arr) {
    res.push(...i);
  }
  return res;
};
const listCatFriendsActivities = function (data) {
  const activities = data.catFriends.map((friend) => friend.activities);
  console.log(activities);
  return data;
};
const printCatFriendsNames = function (data) {
  const names = data.catFriends.map((friend) => friend.name);
  console.log(names);
  return data;
};
const printCatFriendsTotalWeight = function (data) {
  let sum = 0;
  data.catFriends.map((friend) => {
    sum += friend.weight;
  });
  console.log(`the total sum of cat friends weight is ${sum}`);
  return data;
};

const totalActivitiesOfAllCats = function (data) {
  const activities = [
    ...data.activities,
    ...spreadArrOfArr(data.catFriends.map((friend) => friend.activities)),
  ];
  console.log(activities);
  return data;
};
const addTwoMoreActivities = function (data) {
  data.catFriends.map((friend) => {
    if (["bar", "foo"].includes(friend.name)) {
      friend.activities.push("activity1", "activity2");
    }
  });
  console.log(data.catFriends);
  return data;
};
const addHeightWeight = function (data) {
  data.height = 50;
  data.weight = 25;
  return data;
};
const updateName = function (data) {
  data.name = "Fluffyy";
  return data;
};
const updateColor = function (data) {
  data.catFriends.map((friend) => {
    if (friend.name === "bar") {
      friend.furcolor = "black";
    }
  });
  console.log(data.catFriends);
  return data;
};
fs.readFile("problem1.json", { encoding: "utf-8" })
  .then(JSON.parse)
  .then(addHeightWeight)
  .then(updateName)
  .then(listCatFriendsActivities)
  .then(printCatFriendsNames)
  .then(printCatFriendsTotalWeight)
  .then(totalActivitiesOfAllCats)
  .then(addTwoMoreActivities)
  .then(updateColor)
  .then(console.log);
