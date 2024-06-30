// Store queries

/*
placeholders are values that get replaced in the controller, to make the query dynamic
SQLite uses ? as placeholders
MySQL uses the same, PostgreSQL uses $1, $2, ..., $N
*/
const getStudents = 'SELECT * FROM student;';
const getStudentById = 'SELECT * FROM student WHERE id = ?;';
const checkEmailExists = 'SELECT * FROM student WHERE email = ?;';
const addStudent = 'INSERT INTO student (name, email, age, dob) VALUES (?, ?, ?, ?);';
const deleteStudent = 'DELETE FROM student WHERE id = ?;';



module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    deleteStudent,
};
