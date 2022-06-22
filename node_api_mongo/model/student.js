const mongoose = require('mongoose'); // ORM

const Student = mongoose.model('Student', { nombre: String, curso: String });

module.exports = Student;
