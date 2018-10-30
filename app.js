const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//routes for requests
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//     next();
//     console.log("Its working");
//     res.status(200).json({message:"it works"});   
// });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configure middlewares
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
});

app.use((error,req, res, next) => {
    res.status(error.status || 500);
     res.json({error:{message: error.message}});
});

module.exports = app;