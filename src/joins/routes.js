const express = require('express');
const Router = express.Router;
const controller = require('./controller')
const router = Router();

router.get('/getStudentsWithClasses', controller.getStudentsWithClasses);
module.exports = router;