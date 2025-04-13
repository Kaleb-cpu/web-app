const express = require("express");
const mongoose = require('mongoose');
const Student = require("../models/Student");
const authMiddleware = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const students = req.body; // Array of student records

    // Validate if the body is an array and not empty
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Please provide an array of student records." });
    }

    for (const studentData of students) {
      const { studentID, studentName, courseName } = studentData;

      // Validate individual student fields
      if (!studentID || !studentName || !courseName) {
        return res.status(400).json({ message: "All fields are required for each student." });
      }

      // Check if student already exists
      const existingStudent = await Student.findOne({ studentID });
      if (existingStudent) {
        return res.status(409).json({ message: `Student with ID ${studentID} already exists.` });
      }

      // Create student record
      const presentDate = new Date();
      const student = new Student({
        studentID,
        studentName,
        courseName,
        presentDate,
      });
      await student.save();
    }

    res.status(201).json({
      message: "Students created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating students", error: error.message });
  }
});

// Update student by ID
router.put('/update', async (req, res) => {
    try {
        const { studentID, studentName, courseName } = req.body; 

        if (!studentID) {
            return res.status(400).json({ message: 'Student ID is required.' });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { studentID },
            { studentName, courseName }, // Only update provided fields
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

// Delete student records
router.delete("/:studentID", async (req, res) => {
  try {
    const { studentID } = req.params;

    // Check if the student exists
    const student = await Student.findOne({ studentID });
    if (!student) {
      return res.status(404).json({ message: "Student not exists." });
    }

    // Delete the student record
    await Student.deleteOne({ studentID });

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

// Get student by ID
router.get("/:studentID", async (req, res) => {
  try {
    const { studentID } = req.params;

    // Find the student by ID
    const student = await Student.findOne({ studentID });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student retrieved successfully.", student });
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



module.exports = router;
