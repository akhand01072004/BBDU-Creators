const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel =  require('../Models/Admin');
require('dotenv').config();


router.post('/signup', async(req, res) => {
    var code = req.body.code;
    if(code == process.env.CODE){
        await new AdminModel(req.body).save();
        return res.status(200).json({message : "signup"})
    }else{
        return res.status(500).json({message : "something went wrong"});
    }
});

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await AdminModel.findOne({email : email});
        if(!user){
            return res.status(400).json({message : "Invalid email"});
        }
        //check whether given pswd match with existing pswd;
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message : "Wrong Password"});
        }
        const token = jwt.sign({userId: user._id}, process.env.SECRETKEY , {expiresIn : '1d'});
        res.cookie("admin_token", token, {httpOnly: true, secure : process.env.SECRETKEY});
        res.status(200).json({userId: user._id});
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
});

router.put('/updateprofile', async(req,res) => {
    const data = {...req.body};
    const adminemail = data?.email;
    const user = await AdminModel.findOne({email : adminemail});
    const resp = await AdminModel.findByIdAndUpdate(user._id,
                   {...data});
    res.status(202).json({message : user});
})

router.put('/updateImage', async(req,res) => {
    const data = {...req.body};
    const useremail = data?.email;
    console.log(useremail);
    const user = await AdminModel.findOne({email : useremail});
    const resp = await AdminModel.findByIdAndUpdate(user._id,
                   {...data});
    res.status(202).json({message : user});
})

router.get("/validatetoken" , async(req , res) => {
    var admintoken = req.cookies.admin_token;
    try {
        const decode = jwt.verify(admintoken, process.env.SECRETKEY);
        const userdata = await AdminModel.findById(decode.userId);
        return res.status(201).send(userdata);
    } catch (error) {
        return res.status(401).send({message: "unauthorized"});
    }
});

router.get("/logout", async(req , res) => {
    res.cookie("admin_token", "",{
        expires: new Date(0),
    });
    return res.status(201).send({message : "hello from logout"});
});

module.exports = router;