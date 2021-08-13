require('dotenv').config();
const express=require('express');
const bodyParser=require("body-parser");
const app=express();
const mongoose = require("mongoose");
const cors = require("cors");

//Import Routes
const authRoute=require('./routes/auth');
const orderRoute=require('./routes/order');
const adminRoute=require('./routes/admin');
const deliveryPersonRoute=require('./routes/delivery_person');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());

// connection to mongodb
mongoose.connect(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Successfully connected to cloud database")
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", false);

app.get('/',(req,res)=>{
	res.status(200).json({
		"status": "true",
		"message": "Welcome to the the order anything app",
	});
});

//Route Middleware
app.use('/api/auth',authRoute);
app.use('/api/order',orderRoute);
app.use('/api/admin',adminRoute);
app.use('/api/delivery/person',deliveryPersonRoute);

app.listen(process.env.PORT || 3000, function() {
	console.log("Server started on port 3000");
});