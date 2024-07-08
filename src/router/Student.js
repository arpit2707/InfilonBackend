const express = require("express");
const Student = require("../models/Student");
const result = require("../models/Result");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, marks } = req.body;

  const student = new Student({ name, email, phone });
  const newStudent = await student.save();
  console.log(newStudent._id, marks);
  const results = new result({
    studentId: newStudent._id,
    marks: marks,
  });
  const newResult = await results.save();
  try {
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, marks } = req.body;

  try {
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name;
    student.marks = marks;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get-students", async (req, res) => {
  try {
    const students = await Student.find({ deleted: false });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { deleted: true });
    res.json({ message: "Student soft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/hard/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student hard deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
