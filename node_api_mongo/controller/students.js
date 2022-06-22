const Student = require('../model/student');

const students = [];

const getStudents = function (req, res) {
    Student.find().then(students => {
        res.json(students);
    });
};

const saveStudents = function (req, res) {
    console.log(req.body);
    try {
        if (req.body.nombre && req.body.curso) {
            const student = new Student(req.body);
            student.save().then((newStudent) => {
                res.json(newStudent);
            });
        } else {
            res.send(500);
        }
    } catch(error) {
        res.send(500, error);
    }
};

module.exports = {
    getStudents,
    saveStudents
};