const mongoose = require('mongoose');
const { Event } = require('./models/Event');
const { Client } = require('./models/Client');


mongoose.connect(
    "mongodb+srv://DDoS:ddos@cluster0.wj9qovo.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
    console.log('connected');
    Event.deleteMany().then(() => console.log('Events deleted'));
    Client.deleteMany().then(() => console.log('Clients deleted'));
});
