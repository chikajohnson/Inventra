const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("Its working");
    res.status(200).json({message:"it works"});
});

module.exports = app;