const {Client} = require('../models/Client');
const getAllClients = async (req, res) => {
    const clients = await Client.find();
    return res.json(clients);
};

module.exports = {
    getAllClients,
};
