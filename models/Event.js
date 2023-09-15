const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'client'
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    finishTime: {
        type: String,
        required: true,
    },
    repeatable: {
        type: Boolean,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    }
});
const Event = mongoose.model("event", eventSchema);
module.exports = {
    Event,
};
