const express = require("express");
const app = express();

//routes
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//     next();
//     console.log("Its working");
//     res.status(200).json({message:"it works"});   
// });

//confiure middlewares
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);

module.exports = app;