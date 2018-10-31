const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

var User = require('../models/user');

router.post('/signup', (req, res, next) => {
    //check if user exists
    User.find({email: req.body.email})
    .exec()
    .then(result =>{
        if(result.length > 0){
            return res.status(400).json({message: "Email already exists"});
        }
    })
    .catch(error => {
        return res.status(500).json({error:error});
        }   
    ); 
    
    //encrypt password and create user
    bcrypt.hash(req.body.password, null, null, function(err, hash) {

        // Store hash in your password DB.
        //create user
        const user = new User({
            email: req.body.email,
            password: hash
        });

        user.save()
        .then(result => {
            return res.status(200).json({message: "User created", user:result});
        })
        .catch(err => {
            return res.status(500).json({error : err});
        });        

    });

});

router.post('/login', (req, res, next) => {
    //check if user exists
    User.findOne({email: req.body.email})
    .exec()
    .then(result =>{
        if(result === null){
            return res.status(401).json({message: "Auth failed"});
        }
        else{
            bcrypt.compare(req.body.password, result.password, function(err, response) {
                if(response === false){
                    return res.status(401).json({message: "Auth failed"}); 
                }
                else{
                    const token = jwt.sign(
                        {
                            email:result.email,
                            userId: result._id,
                            role: "admin"
                        },
                        "ueudsdudsmisdmiasia",
                        {
                            expiresIn:"120000"
                        }
                    );
                    return res.status(200).json({message: "Auth successful", token:token});
                } 
            });
        }
    })
    .catch(error => {
        return res.status(500).json({error:error});
        }   
    );
});

router.get('/', (req, res, next) => {
    User.find()
    .select("email password")
    .exec()
    .then(result =>{
        return res.status(200).json(result);
    })
    .catch(error => {
        return res.status(500).json({error:error});
        }   
    );     
});

router.get('/:userId', (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
        return res.status(400).json({error: "Invalid user"});
    User.findOne({_id:req.params.userId})
    .select("email password")
    .exec()
    .then(result =>{
        if(result != null){
            return res.status(200).json(result);
        }
        return res.status(404).json({message: "User not found"});
    })
    .catch(error => {
        return res.status(500).json({error:error});
        }   
    );     
});


router.delete('/:userId', (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
        return res.status(400).json({error: "Invalid user"});
    User.remove({_id:req.params.userId})
    .exec()
    .then(result =>{
        return res.status(200).json({result, message:"user deleted"});
    })
    .catch(error => {
        return res.status(500).json({error:error});
        }   
    );     
});

router.patch('/:userId', (req, res, next) => {
    console.log(req.params.userId);
    if (mongoose.Types.ObjectId.isValid(req.params.userId) === false)
        return res.status(400).json({error: "Invalid user"});
    User.findOne({_id:req.params.userId})
    .then(user => {
        if(user == null){
         return res.status(404).json({error: "User does not exist"});
        }
        else{
            User.update({_id: req.params.userId},{$set:{email: req.body.email}})
            .exec()
            .then(result =>{                
                return res.status(200).json({result, message: "User email Updated"});
            })
            .catch(error => {
                return res.status(500).json({error:error});
                }
            ); 
        }
    });
      
});

module.exports = router;