const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://localhost:27017/studentmanagement")
    .then((res) => {
      console.log("database connected");
    });
};
db();

module.exports = db;
