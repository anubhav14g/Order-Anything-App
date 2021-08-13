const router = require("express").Router()
const Customer = require("../models/customer");
const Delivery_Person = require("../models/delivery_person");
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');

router.post("/register/customer",async (req,res)=>{
    const obj ={
        "name": req.body.name,
        "username": String(req.body.phone_no)+"@orderanything.com",
        "phone_no": req.body.phone_no,
        "password": req.body.password
    }
    try{
        const found= await Customer.findOne({"phone_no": req.body.phone_no});
        if(found){
            return res.status(400).json({
                "status": "false",
                "message": "Customer already registered",
            });
        }
        const new_customer= await Customer.create(obj);
        return res.status(200).json({
            "status": "true",
            "message": "Customer registration successfull, plz login",
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


router.post("/login/customer",async (req,res)=>{
    try{
        const found= await Customer.findOne({"phone_no": req.body.phone_no});
        if(!found){
            return res.status(400).json({
                "status": "false",
                "message": "No customer found",
            });
        }
        if(found.password!=req.body.password){
            return res.status(400).json({
                "status": "false",
                "message": "Password does not match",
            });
        }
        const payload={
            userId: found._id
        }
        const token= jwt.sign(payload,process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            "status": "true",
            "message": "Customer login successfull",
            "auth-token": token
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


router.post("/register/admin",async (req,res)=>{
    const obj ={
        "name": req.body.name,
        "username": String(req.body.phone_no)+"@orderanything.com",
        "phone_no": req.body.phone_no,
        "password": req.body.password
    }
    try{
        const found= await Admin.findOne({"phone_no": req.body.phone_no});
        if(found){
            return res.status(400).json({
                "status": "false",
                "message": "Admin already registered",
            });
        }
        const new_admin= await Admin.create(obj);
        return res.status(200).json({
            "status": "true",
            "message": "Admin registration successfull, plz login",
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


router.post("/login/admin",async (req,res)=>{
    try{
        const found= await Admin.findOne({"phone_no": req.body.phone_no});
        if(!found){
            return res.status(400).json({
                "status": "false",
                "message": "No admin found",
            });
        }
        if(found.password!=req.body.password){
            return res.status(400).json({
                "status": "false",
                "message": "Password does not match",
            });
        }
        const payload={
            userId: found._id
        }
        const token= jwt.sign(payload,process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            "status": "true",
            "message": "Admin login successfull",
            "auth-token": token
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


router.post("/register/delivery/person",async (req,res)=>{
    const obj ={
        "name": req.body.name,
        "username": String(req.body.phone_no)+"@orderanything.com",
        "phone_no": req.body.phone_no,
        "password": req.body.password
    }
    try{
        const found= await Delivery_Person.findOne({"phone_no": req.body.phone_no});
        if(found){
            return res.status(400).json({
                "status": "false",
                "message": "Delivery_Person already registered",
            });
        }
        const new_delivery_person= await Delivery_Person.create(obj);
        return res.status(200).json({
            "status": "true",
            "message": "Delivery_Person registration successfull, plz login",
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


router.post("/login/delivery/person",async (req,res)=>{
    try{

        const found= await Delivery_Person.findOne({"phone_no": req.body.phone_no});
        if(!found){
            return res.status(400).json({
                "status": "false",
                "message": "No delivery person found",
            });
        }
        if(found.password!=req.body.password){
            return res.status(400).json({
                "status": "false",
                "message": "Password does not match",
            });
        }
        const payload={
            userId: found._id
        }
        const token= jwt.sign(payload,process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            "status": "true",
            "message": "Delivery_Person login successfull",
            "auth-token": token
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