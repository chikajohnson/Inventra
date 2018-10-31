const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer({dest: 'uploads/'});

//import models
var Product = require('../models/product');

router.get('/', (req, res) => {
    Product.find({}, ["name", "price"])
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });   
});

router.post('/', (req, res,next) => {
    //console.log(req.body);
    const product = new Product({
        name : req.body.name,
        price: req.body.price
    });
    product.save()
    .then((result) => {
        return res.status(200).json({message: "Product save successfully", data: result});
    })
    .catch(error => {
        return res.status(500).json({error:error});
    });
  
});

router.get('/:productId', (req, res)=>{
    if (mongoose.Types.ObjectId.isValid(req.params.productId)) {
        const id = req.params.productId;
        Product.findOne({_id : id})
        .exec()
        .then(result => {
            if(result){
                return res.status(200).json(result);
            }
            else{
                return res.status(404).json({message: "Product not found"});
            }
            
        }).catch(error => {
            res.status(500).json(error.message);
        });
    } else {
        res.status(400).json({error : "Invalid id supplied"});
    }
    
});

router.patch('/:productId', (req, res)=>{
    if (mongoose.Types.ObjectId.isValid(req.params.productId)) {
        console.log(req.body);
        const id = req.params.productId;
        Product.update({_id : id}, {$set: {name:req.body.name, price:req.body.price}})
        .exec()
        .then(result => {
            return res.status(200).json({message: "Product updated successfully"});
        }).catch(error => {
            res.status(500).json(error.message);
        });
    } else {
        res.status(400).json({error : "Invalid id supplied"});
    }
});

router.delete('/:productId', (req, res)=>{
    const id = req.params.productId;
    if (mongoose.Types.ObjectId.isValid(req.params.productId)) {
        Product
        .remove({_id:id})
        .then(result => {
            return res.status(200).json({data : result,message:"product deleted successfully" });
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