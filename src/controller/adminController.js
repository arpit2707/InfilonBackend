const admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  const token = jwt.sign({ userId: id }, "secretkey");
  console.log(token);
  return token;
};

const loggedIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username == null ||
      username == undefined ||
      password == null ||
      password == undefined
    ) {
      return res
        .status(400)
        .json({ err: "Bad Paramters . Something is missing" });
    }
    const user = await admin.findOne({ username: username });
    console.log("user", user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          console.log("entred password is same no error");
          console.log(user);
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateAccessToken(user._id),
          });
        } else {
          console.log("password is worng");
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    } else {
      console.log("USER DOESNT EXIST");
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, success: false });
  }
};

module.exports = { loggedIn };
