const router = require("express").Router()
const Order = require("../models/order");
const Delivery_Person = require("../models/delivery_person");

router.get('/view/assigned/order/:order_id',async (req,res)=>{
    try{
        const order= await Order.findById(req.params.order_id);
        return res.status(200).json({
            "status": "true",
            "message": "your assigned order is",
            "data": order
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


router.post('/update/order/status/:order_id/:delivery_person_id',async (req,res)=>{
    try{
        const order= await Order.findById(req.params.order_id);
        const delivery_person= await Delivery_Person.findById(req.params.delivery_person_id);
        order.order_stages.push(req.body.currentStatus);
        if(req.body.currentStatus=="Delivered"){
            order.status="Delivered";
            delivery_person.status="Available";
        }
        order.save();
        delivery_person.save();
        return res.status(200).json({
            "status": "true",
            "message": "order status updated successfully",
            "data": order
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