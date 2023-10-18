const { Router} = require('express');
const {getAllClients} = require('../services/clientService');
const {allowCors} = require('../allowCors');
const router = new Router();

/* GET users listing. */
router.get('/', allowCors(getAllClients));

module.exports = router;
