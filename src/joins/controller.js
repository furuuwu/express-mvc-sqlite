const db = require('../db');
const queries = require('./queries');

const getStudentsWithClasses = (req, res) => {
    db.all(queries.getStudentsWithClasses, [], (error, rows) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(rows);
    });
};

module.exports = {
    getStudentsWithClasses,
};