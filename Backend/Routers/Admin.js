const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel =  require('../Models/Admin');
require('dotenv').config();


router.post('/signup',async(req, res) => {
    var code = req.body.code;
    if(code == process.env.CODE){
        await new AdminModel(req.body).save();
        return res.status(200).json({message : "signup"})
    }else{
        return res.status(500).json({message : "something went wrong"});
    }
});

module.exports = router;