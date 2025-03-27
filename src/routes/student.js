const express = require("express");
const mongoose = require('mongoose');
const Student = require("../models/Student");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { studentID, studentName, course } = req.body;

    // This validates the input requested
    if (!studentID || !studentName || !course) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingStudent = await Student.findOne({ studentID });
    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists." });
    }

    const presentDate = new Date();
    // Create student record
    const student = new Student({
      studentID,
      studentName,
      course,
      presentDate,
    });
    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student: student,
    });
  } catch (error) {
    res
      .status(409)
      .json({ message: "Error creating student", error: error.message });
  }
});
// Update student by ID
router.put('/update', async (req, res) => {
    try {
        const { studentID, studentName, course } = req.body; 

        if (!studentID) {
            return res.status(400).json({ message: 'Student ID is required.' });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { studentID },
            { studentName, course }, // Only update provided fields
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student updated successfully.', student: updatedStudent });

    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
