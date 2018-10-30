const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Handling GET request for /products'});
});

router.post('/', (req, res, next) => {
    res.status(200).json({message: 'Handling POST request for /products'});
});

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id == 'special'){
        res.status(200).json({message : "you discovered a special id"});
    }
    else{
        res.status(200).json({message : "you passed an id"});
    }
});

router.patch('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id != null){
        res.status(200).json({message : "Updated product."});
    }
});

router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id != null){
        res.status(200).json({message : "deleted product."});
    }
});

module.exports = router;