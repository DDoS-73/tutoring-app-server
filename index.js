const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');const cors = require('cors');

const eventsRouter = require('./routes/events');
const clientsRouter = require('./routes/clients');
const earningsRouter = require('./routes/earnings');

const index = express();

index.use(cors({
  origin: '*'
}));

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));

index.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

index.use('/events', eventsRouter);
index.use('/clients', clientsRouter);
index.use('/earnings', earningsRouter);

// error handler
index.use(function(err, req, res, next) {
  res.json(err);
});

const start = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://DDoS:ddos@cluster0.wj9qovo.mongodb.net/?retryWrites=true&w=majority"
    );
    index.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

module.exports = index
