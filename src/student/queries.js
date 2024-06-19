// Store queries

/*
placeholders are values that get replaced in the controller, to make the query dynamic
SQLite uses ? as placeholders
MySQL uses the same, PostgreSQL uses $1, $2, ..., $N
*/
const getStudents = 'SELECT * FROM students;';
const getStudentById = 'SELECT * FROM students WHERE id = ?;';
const checkEmailExists = 'SELECT * FROM students WHERE email = ?;';
const addStudent = 'INSERT INTO students (name, email, age, dob) VALUES (?, ?, ?, ?);';
const deleteStudent = 'DELETE FROM students WHERE id = ?;';

module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    deleteStudent,
};
