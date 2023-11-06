const { Router} = require('express');
const { createEvent, getEventsByWeek, changePaidStatus, deleteEvent } = require('../services/eventService');
const router = new Router();
const { allowCors } = require('../allowCors')

/* GET users listing. */
router.get('/', allowCors(getEventsByWeek));

router.post('/', allowCors(createEvent));

router.patch('/changePaidStatus', allowCors(changePaidStatus))

router.delete('/:id', allowCors(deleteEvent))

module.exports = router;
