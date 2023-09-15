const { Router} = require('express');
const {getAllClients} = require('../services/clientService');
const router = new Router();

/* GET users listing. */
router.get('/', getAllClients);

module.exports = router;
