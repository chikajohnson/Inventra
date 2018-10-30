const express = require('express'); 
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({message: "GET all Orders"});
});

router.post('/', (req, res, next) => {
    res.status(200).json({message: "POST Orders created"});
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id != null) {
        res.status(200).json({message: "GET Order of id equals " + id});
    }
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id != null) {
        res.status(200).json({message: "UPDATE Order of id equals" + id});
    }
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id != null) {
        res.status(200).json({message: "DELETE Order of id equals" + id});
    }
});

module.exports = router;
