const express = require("express");
const Result = require("../models/Result");

const router = express.Router();

router.post("/", async (req, res) => {
  const { studentId, marks } = req.body;

  try {
    const result = new Result({ studentId, marks });
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const result = await Result.findOne({ studentId: req.params.studentId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { marks } = req.body;

  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      { marks },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
