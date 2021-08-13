const jwt = require('jsonwebtoken');

const generateToken = function(req,res,next){
    const data={
        username: String(req.body.phone_no)+"@orderanything.com",
    }
    try{
        const token= jwt.sign(data,process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            "status": "true",
            "message": "token generated successfully and it will expire in 1 hour",
            "authToken": token
        });
        return next();
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            "status": "false",
            "message": "error occurred while generating token",
            "error": err
        });
    }

} 


const verifyToken = function(req,res,next){
    const token = req.header(process.env.TOKEN_HEADER_KEY);
    try{
        const verified= jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(verified){
            return res.status(200).json({
                "status": "true",
                "message": "token verified successfully",
                "authToken": token
            });
            return next();
        }
        return res.status(401).json({
            "status": "false",
            "message": "token does not match, unauthorised access",
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            "status": "false",
            "message": "error occurred while verifying token",
            "error": err
        });
    }

} 

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};