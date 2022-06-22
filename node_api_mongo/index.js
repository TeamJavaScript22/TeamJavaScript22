const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Body
const app = express(); // Crea un nuevo server
const routes = require('./routes');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', function (req, res) {
    //res.send('Saludos desde express proyecto UTN');
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(routes);

const callbackFn = () => {
    console.log("El servidor está inicializado en el puerto 5000");
};

mongoose.connect('mongodb://localhost:27017/students');
app.listen(5000, callbackFn);
