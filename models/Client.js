const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});
const Client = mongoose.model("client", clientSchema);
module.exports = {
    Client,
};
