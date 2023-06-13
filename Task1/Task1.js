const fs = require("fs");
const spreadArrOfArr = function (arr) {
  let res = [];
  for (i of arr) {
    res.push(...i);
  }
  return res;
};
//////////1
let obj = JSON.parse(fs.readFileSync("problem1.json", { encoding: "utf-8" }));
console.log(obj);

/////////2
obj.height = 50;
obj.weight = 25;

/////////3
obj.name = "Fluffyy";

//////////4
console.log(obj.catFriends.map((friend) => friend.activities));

////////5
console.log(obj.catFriends.map((friend) => friend.name));

///////6
let sum = 0;
obj.catFriends.map((friend) => {
  sum += friend.weight;
});
console.log(sum);

///////////7
console.log([
  ...obj.activities,
  ...spreadArrOfArr(obj.catFriends.map((friend) => friend.activities)),
]);

/////////8
obj.catFriends.map((friend) => {
  if (["bar", "foo"].includes(friend.name)) {
    friend.activities.push("activity1", "activity2");
  }
});
console.log(obj.catFriends);

///////////9
obj.catFriends.map((friend) => {
  if (friend.name === "bar") {
    friend.furcolor = "black";
  }
});
console.log(obj.catFriends);
