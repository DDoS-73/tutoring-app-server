const { Router} = require('express');
const {getMonthEarnings, getWeekEarnings} = require('../services/earningService');
const router = new Router();

/* GET users listing. */
router.get('/month', getMonthEarnings);

router.get('/week', getWeekEarnings);

module.exports = router;
