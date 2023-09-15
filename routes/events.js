const { Router} = require('express');
const { createEvent, getEventsByWeek, changePaidStatus} = require('../services/eventService');
const router = new Router();

/* GET users listing. */
router.get('/', getEventsByWeek);

router.post('/', createEvent);

router.patch('/changePaidStatus', changePaidStatus)

module.exports = router;
