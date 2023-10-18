const { Router} = require('express');
const { createEvent, getEventsByWeek, changePaidStatus} = require('../services/eventService');
const router = new Router();
const { allowCors } = require('../allowCors')

/* GET users listing. */
router.get('/', allowCors(getEventsByWeek));

router.post('/', allowCors(createEvent));

router.patch('/changePaidStatus', allowCors(changePaidStatus))

module.exports = router;
