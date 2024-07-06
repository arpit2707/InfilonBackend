const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./src/router/Admin");
const studentRoutes = require("./src/router/Student");
const resultRoutes = require("./src/router/Results");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/results", resultRoutes);

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/student-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => console.log(`Server running`));
