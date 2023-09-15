const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const eventsRouter = require('./routes/events');
const clientsRouter = require('./routes/clients');
const earningsRouter = require('./routes/earnings');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/events', eventsRouter);
app.use('/clients', clientsRouter);
app.use('/earnings', earningsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.json(err);
});

const start = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://DDoS:ddos@cluster0.wj9qovo.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
