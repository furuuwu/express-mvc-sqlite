const db = require('../db');
const queries = require('./queries');

// Get all classes
const getClasses = (req, res) => {
    db.all(queries.getClasses, (err, classes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(classes);
    });
};

// Get class by ID
const getClassById = (req, res) => {
    const { id } = req.params;
    db.get(queries.getClassById, [id], (err, classItem) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!classItem) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classItem);
    });
};

// Add a new class
const addClass = (req, res) => {
    const { name } = req.body;
    db.run(queries.addClass, [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name });
    });
};

// Delete a class
const deleteClassById = (req, res) => {
    const { id } = req.params;
    db.run(queries.deleteClass, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Class deleted successfully' });
    });
};

// Update teh name of a class
const updateClassNameById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.run(queries.updateClassNameById, [name, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ name });
    });
};

module.exports = {
    getClasses,
    getClassById,
    addClass,
    deleteClassById,
    updateClassNameById
};