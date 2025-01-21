const express = require('express');
const router = express.Router()
const { postTask, putTask, patchTask, getTask, getTodayTask, getWeekTask, getMonthTask, getATask, deleteTask, getTaskOrdered } = require('../controllers/tarefas.js');


router.route('/order').get(getTaskOrdered);

router.route('/hoje').get(getTodayTask);

router.route('/semana').get(getWeekTask);

router.route('/mes').get(getMonthTask);

router.route('/').get(getTask).post(postTask);
router.route('/:id').get(getATask).put(putTask).patch(patchTask).delete(deleteTask);


module.exports = router