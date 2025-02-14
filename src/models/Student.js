const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    presentDate: { type: Date, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
