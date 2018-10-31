const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//import models
var Order = require('../models/order');
var Product = require('../models/product');
var checkAuth = require("./middlewares/checkauth");


router.get('/', checkAuth, (req, res) => {
    Order.find()
    .select("productId quantity")
   .populate('product')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });   
});

router.post('/', (req, res,next) => {
    if (mongoose.Types.ObjectId.isValid(req.body.product) === false)
        return  res.status(400).json({message: "invalid productid supplied"});

    Product.findById(req.body.productId)
    .then(doc => {
        if(doc != null){
            return res.status(404).json({message: "Product not found"});
        }
    })
    .catch(err => {return res.status(500).json({error: err});})
    const order = new Order({
        product : req.body.productId,
        quantity: req.body.quantity
    });

    order.save()
    .then((result) => {
        return res.status(200).json({message: "Order saved successfully", data: result});
    })
    .catch(error => {
        return res.status(500).json({error:error});
    });
  
});

router.get('/:orderId', (req, res)=>{
    if (mongoose.Types.ObjectId.isValid(req.params.orderId)) {
        const id = req.params.orderId;
        Order.findOne({_id : id})
        .populate('product')
        .exec()
        .then(result => {
            if(result){
                return res.status(200).json(result);
            }
            else{
                return res.status(404).json({message: "Order not found"});
            }
            
        }).catch(error => {
            res.status(500).json(error.message);
        });
    } else {
        res.status(400).json({error : "Invalid id supplied"});
    }
    
});

router.patch('/:orderId', (req, res)=>{
    if (mongoose.Types.ObjectId.isValid(req.params.orderId)) {

        if (mongoose.Types.ObjectId.isValid(req.body.productId) === false)
        return  res.status(400).json({message: "invalid productid supplied"});

        Product.findById(req.body.productId)
        .then(doc => {
            if(doc != null){
                return res.status(404).json({message: "Product not found"});
            }
        })
        .catch(err => {return res.status(500).json({error: err});})
        const order = new Order({
            product : req.body.productId,
            quantity: req.body.quantity
        });

        const id = req.params.orderId;
        Order.update({_id : id}, {$set: {product:req.body.productId, quantity:req.body.quantity}})
        .exec()
        .then(result => {
            return res.status(200).json({message: "Order updated successfully"});
        }).catch(error => {
            res.status(500).json(error.message);
        });
    } else {
        res.status(400).json({error : "Invalid id supplied"});
    }
});

router.delete('/:orderId', (req, res)=>{
    const id = req.params.orderId;
    if (mongoose.Types.ObjectId.isValid(req.params.orderId)) {
        Order
        .remove({_id:id})
        .then(result => {
            return res.status(200).json({data : result,message:"order deleted successfully" });
        })
        .catch(error => {
            res.status(500).json(error.message);
        });        
    }
    else{
        res.status(400).json({error : "Invalid id supplied"});
    }
});

module.exports = router;