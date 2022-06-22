const router = require('express').Router();
const studentController = require('../controller/students');

const students = [];

// Obtener
router.get('/students', studentController.getStudents);

// Guardar datos
router.post('/students', studentController.saveStudents);

// Modificar datos
router.put('/students/:id', function (req, res) {
    // buscar el student
    // Students.findOneAndUpdate({ _id: req.param.id})
    res.json(students);
});

// Borrar
router.delete('/students/:id', function (req, res) {
    // Buscar entre los strudents por nombre
    // Eliminarlo del array
    // Students.findOneAndDelete({ _id: req.param.id})

    res.json(students);
});

module.exports = router;
