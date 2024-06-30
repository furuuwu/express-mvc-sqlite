// Set up your Express server and define routes

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const studentsRoutes = require('./student/routes');
const classesRoutes = require('./class/routes');
const joinsRoutes = require('./joins/routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1/students', studentsRoutes);
app.use('/api/v1/classes', classesRoutes);
app.use('/api/v1/', joinsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}/`);
});