const router = require("express").Router()
const Order = require("../models/order");
const Delivery_Person = require("../models/delivery_person");

router.get('/see/all/orders',async (req,res)=>{
    try{
        const all_orders= await Order.find({});
        return res.status(200).json({
            "status": "true",
            "message": "List of all orders",
            "data": all_orders
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


router.get('/see/all/delivery/persons',async (req,res)=>{
    try{
        const all_delivery_persons= await Delivery_Person.find({});
        return res.status(200).json({
            "status": "true",
            "message": "List of all delivery persons",
            "data": all_delivery_persons
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


// admin will choose not assigned order and give it to available delivery person
router.get('/assign/order/to/delivery/person/:order_id/:delivery_person_id',async (req,res)=>{
    try{
        const order= await Order.findById(req.params.order_id);
        const delivery_person= await Delivery_Person.findById(req.params.delivery_person_id);
        order.assigned_or_not="Assigned";
        order.delivery_person_id=req.params.delivery_person_id;
        delivery_person.status="Busy";
        order.save();
        delivery_person.save();
        return res.status(200).json({
            "status": "true",
            "message": "order assigned successfully",
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