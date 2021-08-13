const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items_booked: [{
      category: {
        type: String,
        required: true
      },
      locations: {
          type: Array,
          required: true,
          default: []
      },
      quantity: {
          type: Number,
          required: true
      }
    }],
    delivery_person_id: {
      type:	mongoose.Schema.Types.ObjectId,
      ref: 	"Delivery_Person"
    },
    customer_id: {
      type:	mongoose.Schema.Types.ObjectId,
      ref: 	"Customer"
    },
    // Task Created, Reached Store, Items Picked, Enroute, Delivered 
    // by delivery person
    // 5 stages
    order_stages: {
      type: Array,
      default: []
    },
    // Delivered, Not Delivered, Cancelled
    // at the end
    status: {
      type: String,
      default: "Not Delivered"
    },
    // check whether order is assigned to delivery person or not
    // Not Assigned , Assigned
    assigned_or_not: {
      type: String,
      default: "Not Assigned"
    },
    pickup_locations: {
      type: Array
    }
}
,
{
  timestamps: true
});

module.exports=mongoose.model("Order",orderSchema);