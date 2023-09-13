var express = require('express');
var router = express.Router();

const auth = require('../middleware/auth');

const TodoController = require('../controllers/TodoController');

router.get('/todos', TodoController.index);
router.get('/todos/:id', TodoController.get);
router.post('/todos/store', TodoController.store);
router.patch('/todos/:id/update', TodoController.update);
router.delete('/todos/:id/delete', TodoController.destroy);

module.exports = router;
