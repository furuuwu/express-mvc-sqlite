// Business logic related to each route

const db = require('../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    // 'SELECT * FROM students;'
    db.all(queries.getStudents, [], (error, rows) => {
        if (error) {
            res.status(500).send('Error retrieving students');
            return;
        }

        res.status(200).json(rows);
    })
};

const getStudentById = (req, res) => {
    // 'SELECT * FROM students WHERE id = $1'
    const id = parseInt(req.params.id);

    db.get(queries.getStudentById, [id], (error, row) => {
        if (error) {
            res.status(500).send('Error retrieving student');
            return;
        }

        if (!row) {
            res.status(404).send('Student not found');
            return;
        }

        res.status(200).json(row);
    })
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    console.log(req.body);

    // check if email exists
    db.get(queries.checkEmailExists, [email], (error, row) => {
        if (error) {
            res.status(500).send('Error checking email');
            return;
        }
        if (row) {
            res.status(400).send('Email already exists.');
            return;
        }

        // add student to the table
        db.run(queries.addStudent, [name, email, age, dob], (error) => {
            if (error) {
                res.status(500).send('Error adding student');
                return;
            }

            // has been created sucessfully
            res.status(201).json("Student created successfully!");
            console.log("Student created successfully!");
        });
    });
};

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    // you cannot use a arrow function here because you'll need to use `this`
    db.run(queries.deleteStudent, [id], function (error) {
        if (error) {
            console.error('Error deleting student:', error.message);
            res.status(500).send('Error deleting student');
            return;
        }
        if (this.changes === 0) {
            // db.run's callback function provides this.changes to check the number of affected rows

            res.status(404).send('Student not found, could not remove.');
        } else {
            res.status(200).send('Student deleted.');
        }
    });
};

// this query has to be constructed dynamically
const updateStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    const fields = req.body;

    // Check if there are fields to update
    if (Object.keys(fields).length === 0) {
        res.status(400).send('No fields to update');
        return;
    }

    // Construct the update query dynamically
    let setClause = [];
    let values = [];
    let index = 1;

    for (let [key, value] of Object.entries(fields)) {
        setClause.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id);

    const query = `UPDATE students SET ${setClause.join(', ')} WHERE id = ?`;

    // Execute the query
    // you cannot use a arrow function here because you'll need to use `this`
    db.run(query, values, function (error) {
        if (error) {
            res.status(500).send('Error updating student');
            return;
        }
        if (this.changes === 0) {
            res.status(404).send('Student not found');
        } else {
            res.status(200).send('Student updated successfully');
        }
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudentById,
};