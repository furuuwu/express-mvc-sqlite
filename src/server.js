// Set up your Express server and define routes

const express = require('express');
const studentsRoutes = require('./student/routes');

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/v1/students', studentsRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});