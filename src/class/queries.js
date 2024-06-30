// Store queries

const getClasses = 'SELECT * FROM class;';
const getClassById = 'SELECT * FROM class WHERE id = ?;';
const addClass = 'INSERT INTO class (name) VALUES (?);';
const deleteClass = 'DELETE FROM class WHERE id = ?;';
const updateClassNameById = 'UPDATE class SET name = ? WHERE id = ?;';

module.exports = {
    getClasses,
    getClassById,
    addClass,
    deleteClass,
    updateClassNameById,
};
