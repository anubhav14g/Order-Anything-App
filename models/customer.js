const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Customer",customerSchema);