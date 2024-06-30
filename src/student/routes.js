// Store routes

const express = require('express');
const Router = express.Router;
// or just
// const { Router } = require('express');

const controller = require('./controller')

const router = Router();

/*
router.get('/', (req, res) => {
    res.send('using api route');
});
*/

// Using the controller for this route
// router.get('/', (req, res) => controller.getStudents(req, res));
router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudentById);
router.delete('/:id', controller.deleteStudent);
module.exports = router;