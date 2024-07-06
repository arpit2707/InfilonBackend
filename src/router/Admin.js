const express = require("express");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const adminC = require("../controller/adminController");

const router = express.Router();

router.post("/login", adminC.loggedIn);

module.exports = router;
