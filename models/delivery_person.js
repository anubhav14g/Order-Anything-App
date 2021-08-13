const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // available or busy
    status: {
        type: String,
        default: "Available"
    }
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Delivery_Person",deliveryPersonSchema);