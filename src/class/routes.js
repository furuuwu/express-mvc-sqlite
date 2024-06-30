const express = require('express');
const Router = express.Router;
const controller = require('./controller')
const router = Router();

router.get('/', controller.getClasses);
router.post('/', controller.addClass);
router.get('/:id', controller.getClassById);
// this update method could be more generic...
router.put('/:id', controller.updateClassNameById);
router.delete('/:id', controller.deleteClassById);

module.exports = router;