const { Router} = require('express');
const {getMonthEarnings, getWeekEarnings} = require('../services/earningService');
const {allowCors} = require('../allowCors');
const router = new Router();

/* GET users listing. */
router.get('/month', allowCors(getMonthEarnings));

router.get('/week', allowCors(getWeekEarnings));

module.exports = router;
