const router = require("express").Router()
const Order = require("../models/Order");

router.post('/place/:customer_id',async (req,res)=>{
    const obj={
        "items_booked": req.body.items_booked,
        "customer_id": req.params.customer_id,
    }
    try{
        const order_placed= await Order.create(obj);
        let pickup_locations_array=[];
        for(var i=0;i<order_placed.items_booked.length;i++){
            let new_obj={
                "category": order_placed.items_booked[i].category,
                "quantity": order_placed.items_booked[i].quantity,
                "pickup_location": order_placed.items_booked[i].locations[Math.floor((Math.random()*(order_placed.items_booked[i].locations.length-1))+0)]
            }
            pickup_locations_array.push(new_obj)
        }
        order_placed.pickup_locations=pickup_locations_array;
        order_placed.save();
        return res.status(200).json({
            "status": "true",
            "message": "order placed successfully",
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            "status": "false",
            "message": "Some error occured!",
        });
    }
})


module.exports = router;